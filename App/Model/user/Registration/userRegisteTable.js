"use strict";

const CreateUserRegisterTable = `
CREATE TABLE IF NOT EXISTS userregister (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    photo TEXT COLLATE utf8mb4_unicode_ci DEFAULT NULL
  );
`;

module.exports ={CreateUserRegisterTable};
