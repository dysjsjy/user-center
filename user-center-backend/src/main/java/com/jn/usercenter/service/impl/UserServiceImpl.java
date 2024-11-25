package com.jn.usercenter.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jn.usercenter.model.domain.User;
import com.jn.usercenter.service.UserService;
import com.jn.usercenter.mapper.UserMapper;
import org.springframework.stereotype.Service;

/**
* @author dysjs
* @description 针对表【user】的数据库操作Service实现
* @createDate 2024-11-25 22:33:13
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{

}




