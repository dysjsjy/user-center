package com.jn.usercenter.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jn.usercenter.model.domain.Log;
import com.jn.usercenter.service.LogService;
import com.jn.usercenter.mapper.LogMapper;
import org.springframework.stereotype.Service;

/**
* @author dysjs
* @description 针对表【log】的数据库操作Service实现
* @createDate 2024-11-25 22:33:13
*/
@Service
public class LogServiceImpl extends ServiceImpl<LogMapper, Log>
    implements LogService{

}




