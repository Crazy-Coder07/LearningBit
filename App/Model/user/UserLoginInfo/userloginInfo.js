"use strict";

const CreateUserRegisterTable = `
CREATE TABLE IF NOT EXISTS user_login_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    access_token TEXT,
    refresh_token TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=INNODB;
`;

module.exports ={CreateUserLoginInfoTable};
