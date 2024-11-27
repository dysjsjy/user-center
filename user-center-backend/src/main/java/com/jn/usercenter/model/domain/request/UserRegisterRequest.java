package com.jn.usercenter.model.domain.request;

import lombok.Data;

import java.io.Serializable;


@Data
public class UserRegisterRequest implements Serializable {

    private String username;

    private String password;

    private String checkPassword;
}
