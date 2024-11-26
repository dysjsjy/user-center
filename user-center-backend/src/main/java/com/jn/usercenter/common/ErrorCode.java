package com.jn.usercenter.common;


import lombok.Getter;

/*
自定义的错误代码
1. ErrorCode不需要传递data，所以仅包含code、message、description，且都是final不可改变的
 */
@Getter
public enum ErrorCode {
    //附上常用的ErrorCode
    SUCCESS(0, "ok", ""),
    PARAMS_ERROR(40000, "请求参数错误", ""),
    NULL_ERROR(40001, "请求数据为空", ""),
    NOT_LOGIN(40100, "未登录", ""),
    NO_AUTH(40101, "无权限", ""),
    SYSTEM_ERROR(50000, "系统内部异常", "");

    private final int code;

    private final String message;

    private final String description;

    ErrorCode(int code, String message, String description) {
        this.code = code;
        this.message = message;
        this.description = description;
    }

}
