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
exports.BoardsController = void 0;
var common_1 = require("@nestjs/common");
var board_status_validation_pipe_1 = require("./pipes/board-status-validation.pipe");
var passport_1 = require("@nestjs/passport");
var get_user_decorator_1 = require("src/auth/custom-deco/get-user.decorator");
var BoardsController = /** @class */ (function () {
    function BoardsController(boardsService) {
        this.boardsService = boardsService;
    }
    BoardsController.prototype.getAllBoards = function () {
        return this.boardsService.getAllboards();
    };
    BoardsController.prototype.getBoardById = function (id) {
        return this.boardsService.getBoardById();
    };
    BoardsController.prototype.getBoardsByUser = function (user) {
        return this.boardsService.getBoardsByUser(user);
    };
    BoardsController.prototype.createBoard = function (createBoardDto, user) {
        return this.boardsService.creatBoard(createBoardDto, user);
    };
    BoardsController.prototype.deleteBoard = function (id, user) {
        return this.boardsService.deleteBoard(id, user);
    };
    BoardsController.prototype.updateBoardStatus = function (id, status) {
        return this.boardsService.updateBoardStatus(id, status);
    };
    __decorate([
        common_1.Get()
    ], BoardsController.prototype, "getAllBoards");
    __decorate([
        common_1.Get('/:id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], BoardsController.prototype, "getBoardById");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, get_user_decorator_1.GetUser())
    ], BoardsController.prototype, "getBoardsByUser");
    __decorate([
        common_1.Post(),
        common_1.UsePipes(common_1.ValidationPipe),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, common_1.Body()),
        __param(1, get_user_decorator_1.GetUser())
    ], BoardsController.prototype, "createBoard");
    __decorate([
        common_1.Delete('/:id'),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, get_user_decorator_1.GetUser())
    ], BoardsController.prototype, "deleteBoard");
    __decorate([
        common_1.Patch('/:id/status'),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, common_1.Body('status', board_status_validation_pipe_1.BoardStatusValidationPipe))
    ], BoardsController.prototype, "updateBoardStatus");
    BoardsController = __decorate([
        common_1.Controller('boards')
    ], BoardsController);
    return BoardsController;
}());
exports.BoardsController = BoardsController;
