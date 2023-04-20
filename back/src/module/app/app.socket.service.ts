import { Injectable } from '@nestjs/common';
import { SocketHandler } from 'src/common/common.type';

@Injectable()
export class AppSocketService extends SocketHandler {}
