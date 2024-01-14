import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ChangeListTasksDto, CreateListTasksDto } from './dto/create-list-tasks.dto'
import { ListTasksService } from './list-tasks.service'

@ApiTags('Списки задач')
@Controller('list-tasks')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class ListTasksController {

    constructor(
        private readonly listTasksService: ListTasksService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Создание списка задач' })
    public createListTasks(
        @Body() createListTasks: CreateListTasksDto
    ) {
        const listTasks = this.listTasksService.createListTasks(createListTasks)
        return listTasks
    }

    @Patch()
    @ApiOperation({ summary: 'Обновление названия списка задач' })
    public updateTitleListTasks(
        @Body() createListTasks: ChangeListTasksDto
    ) {
        const listTasks = this.listTasksService.updateTitleListTasks(createListTasks)
        return listTasks
    }

    @Delete()
    @ApiOperation({ summary: 'Удаление списка задач' })
    public deleteListTasks(
        @Query('listId', ParseIntPipe) listId: number,
        @Query('userId', ParseIntPipe) userId: number,
    ) {
        const listTasks = this.listTasksService.deleteListTasks({ listId, userId })
        return listTasks
    }

    @Get(':listId')
    @ApiOperation({ summary: 'Получение одного списка задач' })
    public findOneListTasksById(
        @Param('listId', ParseIntPipe) listId: number,
    ) {
        const listTasks = this.listTasksService.findOneListTasksById(listId)
        return listTasks
    }

    @Get()
    @ApiOperation({ summary: 'Получение всех списков задач' })
    public findAllListsTasks(
        @Query('userId', ParseIntPipe) userId: number,
    ) {
        const listTasks = this.listTasksService.findAllListsTasks(userId)
        return listTasks
    }
}
