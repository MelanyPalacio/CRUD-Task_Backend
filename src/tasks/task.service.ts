import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return this.taskRepository.findOne({ where: { id } });
  }

  create(task: Partial<Task>) {
    if (typeof task.dueDate === 'string' && task.dueDate === '') {
      task.dueDate = undefined;
    }
    return this.taskRepository.save(task);
  }

  async update(id: number, task: Partial<Task>) {
    await this.taskRepository.update(id, task);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.taskRepository.delete(id);
    return { deleted: true };
  }
}