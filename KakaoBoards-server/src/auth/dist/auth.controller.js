"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var get_user_decorator_1 = require("./custom-deco/get-user.decorator");
var AuthController = /** @class */ (function () {
    function AuthController(authService) {
        this.authService = authService;
    }
    AuthController.prototype.getAllUsers = function () {
        return this.authService.getAllUsers();
    };
    AuthController.prototype.getCurrentUser = function (user) {
        return user;
    };
    AuthController.prototype.createAccount = function (authCreateDto) {
        return this.authService.createAccount(authCreateDto);
    };
    AuthController.prototype.signIn = function (authCredentialsDto) {
        return this.authService.signIn(authCredentialsDto);
    };
    AuthController.prototype.deleteAccount = function (userId, user) {
        return this.authService.deleteAccount(userId, user);
    };
    __decorate([
        common_1.Get('/')
    ], AuthController.prototype, "getAllUsers");
    __decorate([
        common_1.Get('/current'),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, get_user_decorator_1.GetUser())
    ], AuthController.prototype, "getCurrentUser");
    __decorate([
        common_1.Post('/signup'),
        common_2.UsePipes(common_2.ValidationPipe),
        __param(0, common_1.Body())
    ], AuthController.prototype, "createAccount");
    __decorate([
        common_1.Post('/signin'),
        common_2.UsePipes(common_2.ValidationPipe),
        __param(0, common_1.Body())
    ], AuthController.prototype, "signIn");
    __decorate([
        common_1.Delete('/:userId'),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, common_1.Param('userId')),
        __param(1, get_user_decorator_1.GetUser())
    ], AuthController.prototype, "deleteAccount");
    AuthController = __decorate([
        common_1.Controller('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
