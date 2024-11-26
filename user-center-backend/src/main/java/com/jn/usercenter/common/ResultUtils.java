package com.jn.usercenter.common;


/*
使用BaseResponse和ErrorCode组合起来的ResultUtiles，相当于一些组合好的Response
 */
public class ResultUtils {

    //这里包含两个知识点
    //1. 方法级别泛型和类级别泛型
    //static <T>这个是方法级别泛型，一个是用于解决static修饰下的静态函数无法使用泛型，一个是用于进行类型检擦，调用时无需显示声明返回值类型
    //BaseResponse<T>是类级别泛型，用于确定T data
    public static <T> BaseResponse<T> success(T data) {
        return new BaseResponse<>(0, data, "ok");
    }

    public static BaseResponse error(int code, String message, String description) {
        return new BaseResponse(code, null, message, description);
    }

    public static BaseResponse error(ErrorCode errorCode) {
        return new BaseResponse(errorCode);
    }

    public static BaseResponse error(ErrorCode errorCode, String message, String description) {
        return new BaseResponse(errorCode.getCode(), message, description);
    }

    public static BaseResponse error(ErrorCode errorCode, String description) {
        return new BaseResponse(errorCode.getCode(), description);
    }
}
