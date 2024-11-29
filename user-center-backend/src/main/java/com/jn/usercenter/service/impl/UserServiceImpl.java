package com.jn.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jn.usercenter.common.ErrorCode;
import com.jn.usercenter.exception.BusinessException;
import com.jn.usercenter.model.domain.User;
import com.jn.usercenter.service.UserService;
import com.jn.usercenter.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.jn.usercenter.contant.UserConstant.USER_LOGIN_STATE;

/**
* @author dysjs
* @description 针对表【user】的数据库操作Service实现
* @createDate 2024-11-25 22:33:13
*/
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{

    private final UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    /**
     * 盐值，混淆密码
     */
    private static final String SALT = "dysjsjy";

    /**
     * 用户注册
     * @param username
     * @param password
     * @param checkPassword
     * @return
     */
    @Override
    public long userRegister(String username, String password, String checkPassword) {
        //1.校验
        if (StringUtils.isBlank(username) || StringUtils.isBlank(password) || StringUtils.isBlank(checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (username.length() < 4 || username.length() > 16) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户名过长或过短");
        }
        if (password.length() < 8 || checkPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "密码过短");
        }
        //2. 账号不能包含特殊字符
        String validPattern = "[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
        Matcher matcher = Pattern.compile(validPattern).matcher(username);
        if (matcher.find()) {
            return -1;
        }
        //密码和验证密码要相同
        if (!password.equals(checkPassword)) {
            return -1;
        }
        //账号不能重复
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        long count = userMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户名重复");
        }
        //加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + password).getBytes());
        //插入数据
        User user = new User();
        user.setUsername(username);
        user.setPassword(encryptPassword);
        boolean saveResult = this.save(user);
        if (!saveResult) {
            return -1;
        }
        return user.getId();
    }

    /**
     * 用户登录
     * @param username
     * @param password
     * @param request
     * @return
     */
    @Override
    public User userLogin(String username, String password, HttpServletRequest request) {
        //校验、不能包含特殊字符、用户是否存在、用户数据脱敏
        if (StringUtils.isAnyBlank(username, password)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (username.length() < 4 || username.length() > 16) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户名过长或过短");
        }
        if (password.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "密码过短");
        }
        //2. 账号不能包含特殊字符
        String validPattern = "[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
        Matcher matcher = Pattern.compile(validPattern).matcher(username);
        if (matcher.find()) {
            return null;
        }
        //用户密码加密
        //加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + password).getBytes());
//        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("username", username);
//        queryWrapper.eq("password", encryptPassword);
//        User user = userMapper.selectOne(queryWrapper);
        User user = userMapper.userLogin(username, encryptPassword);
        if (user == null) {
            log.info("登录失败，用户名或密码错误。");
            return null;
        }
        //用户脱敏
        User safetyUser = getSafetyUser(user);
        //记录用户登录数据
        request.getSession().setAttribute(USER_LOGIN_STATE, safetyUser);
        return safetyUser;
    }

    /**
     * 用户脱敏
     * @param user
     * @return
     */
    @Override
    public User getSafetyUser(User user) {
        if (user == null) {
            return null;
        }
        User safetyUser = new User();
        safetyUser.setId(user.getId());
        safetyUser.setUsername(user.getUsername());
        safetyUser.setEmail(user.getEmail());
        return safetyUser;
    }

    /**
     * 用户登出
     * @param request
     * @return
     */
    @Override
    public int userLogout(HttpServletRequest request) {
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        return 1;
    }
}
