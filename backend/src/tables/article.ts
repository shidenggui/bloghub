import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BlogTable } from './blog';
import { Article } from '../domains/hub/models/article';

@Entity()
export class ArticleTable {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({length: 512})
  public url: string;

  @Column({length: 512})
  public slug: string;

  @Column({length: 512})
  public stableUrl: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => BlogTable)
  blog: BlogTable;

  @Column({length: 512})
  public title: string;

  @Column({length: 512})
  public tags: string;

  @Column('longtext')
  public summary: string;

  @Column('longtext')
  public content: string;

  @Column({length: 2048, nullable: true})
  public imgUrl: string;

  @Column()
  public date: Date;

  @Column({default: 0})
  public views: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  toModel(): Article {
    return new Article(
      this.id,
      this.url,
      this.slug,
      this.blog.toModel(),
      this.title,
      this.tags.split(','),
      this.summary,
      this.content,
      this.imgUrl,
      this.date,
      this.views,
      this.createdAt,
      this.updatedAt,
    );
  }
}
