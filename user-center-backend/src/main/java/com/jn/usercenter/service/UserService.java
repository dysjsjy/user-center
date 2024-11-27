package com.jn.usercenter.service;

import com.jn.usercenter.model.domain.User;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author dysjs
* @description 针对表【user】的数据库操作Service
* @createDate 2024-11-25 22:33:13
*/
public interface UserService extends IService<User> {

    long userRegister(String username, String password, String checkPassword);

    User userLogin(String username, String password, HttpServletRequest request);

    User getSafetyUser(User user);

    int userLogout(HttpServletRequest request);
}
