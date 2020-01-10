import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Blog } from '../domains/hub/models/blog';

@Entity()
export class BlogTable {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public author: string;

  @Column()
  public site: string;

  @Column()
  public stableSite: string;

  @Column()
  public siteName: string;

  @Column()
  public feed: string;

  @Column()
  public stableFeed: string;


  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  toModel(): Blog {
    return new Blog(
      this.id,
      this.author,
      this.site,
      this.stableSite,
      this.siteName,
      this.feed,
      this.createdAt,
      this.updatedAt,
    );
  }
}
