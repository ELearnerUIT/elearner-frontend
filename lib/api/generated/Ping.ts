/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { TestEntity } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Ping<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags hello-world-controller
   * @name Ping
   * @request GET:/ping
   */
  ping = (params: RequestParams = {}) =>
    this.request<TestEntity, any>({
      path: `/ping`,
      method: "GET",
      ...params,
    });
}
