import { getRepository, Raw, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private repositoryUser: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.repositoryUser = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    return this.repository
      .createQueryBuilder('game')
      .where({title: Raw(alias => `LOWER(${alias}) ILIKE '%${param}%'`)})
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    return this.repository.query('SELECT COUNT(*) FROM games');
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
     const users = this.repositoryUser
      .createQueryBuilder('user')
      .innerJoinAndSelect("user.games", "game", "game.id = :id", { id: id })
      .getMany();

      return users;
  }
}
