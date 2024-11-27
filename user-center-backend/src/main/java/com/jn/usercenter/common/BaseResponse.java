package com.jn.usercenter.common;


import lombok.Data;

import java.io.Serializable;

/*
基础的统一的返回
1. 因为要完成网络传输，所以要实现Serializable
2. BaseResponse<T>，这里的T是一个泛型参数，BaseResponse中的data会有各种类型，比如user，data会传输各种类型的数据
3. @Data的作用是自动生成一些get、set、toString()、equals() 和 hashCode()方法
 */
@Data
public class BaseResponse<T> implements Serializable {
    private int code;

    private T data;

    private String message;

    private String description;

    //一个完整的构造方法
    public BaseResponse(int code, T data, String message, String description) {
        this.code = code;
        this.data = data;
        this.message = message;
        this.description = description;
    }

    //一些简单的构造方法
    //直接使用完整的构造方法简化
    public BaseResponse(int code, T data, String message) {
        this(code, data, message, "");
    }

    public BaseResponse(int code, T data) {
        this(code, data, "", "");
    }

    //仅使用ErrorCode的构造方法
    public BaseResponse(ErrorCode errorCode) {
        this(errorCode.getCode(), null, errorCode.getMessage(), errorCode.getDescription());
    }
}
