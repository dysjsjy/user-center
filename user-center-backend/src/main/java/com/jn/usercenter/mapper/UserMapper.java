package com.jn.usercenter.mapper;

import com.jn.usercenter.model.domain.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
* @author dysjs
* @description 针对表【user】的数据库操作Mapper
* @createDate 2024-11-25 22:33:13
* @Entity generator.domain.User
*/
public interface UserMapper extends BaseMapper<User> {
    User userLogin(String username, String password);
}
