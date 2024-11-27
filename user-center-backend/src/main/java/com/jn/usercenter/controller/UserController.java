package com.jn.usercenter.controller;

import com.jn.usercenter.common.BaseResponse;
import com.jn.usercenter.common.ErrorCode;
import com.jn.usercenter.exception.BusinessException;
import com.jn.usercenter.model.domain.request.UserRegisterRequest;
import com.jn.usercenter.service.UserService;
import com.jn.usercenter.common.ResultUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public BaseResponse<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest) {
        //参数校验
        if (userRegisterRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        //去除数据
        String username = userRegisterRequest.getUsername();
        String password = userRegisterRequest.getPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        //参数校验
        if (StringUtils.isBlank(username) || StringUtils.isBlank(password) || StringUtils.isBlank(checkPassword)) {
            return null;
        }
        long result = userService.userRegister(username, password, checkPassword);
        return ResultUtils.success(result);
    }
}
