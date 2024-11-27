package com.jn.usercenter.model.domain.request;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserLoginRequest implements Serializable {

    private String username;

    private String password;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
