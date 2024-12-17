import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UploadStatus {
  PENDING = 'Pending',
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

@Entity({ name: 'upload-history' })
export class UploadHistory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamptz' })
  uploadedDate: Date;

  @Column()
  filePath: string;
  
  @Column({ type: 'enum', enum: UploadStatus })
  status: UploadStatus;

  @Column()
  comment: string
}
