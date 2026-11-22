import Image from 'next/image';
import type { ReactNode, Ref } from 'react';
import type { ProjectItem } from '@/types';
import styles from './project-frame.module.css';

type Props = {
  project: ProjectItem;
  sizes: string;
  className?: string;
  detailRef?: Ref<HTMLDivElement>;
  children?: ReactNode;
};

export function ProjectFrame({ project, sizes, className = '', detailRef, children }: Props) {
  return (
    <div className={(detailRef ? styles.detail : styles.frame) + ' ' + className}>
      <div
        ref={detailRef}
        data-case-cover={detailRef ? undefined : ''}
        data-project-detail-cover={detailRef ? '' : undefined}
        className={styles.photo}
        style={{ aspectRatio: project.coverAspectRatio }}
      >
        <Image src={project.image} alt={project.imageAlt} fill sizes={sizes} loading={detailRef ? 'eager' : 'lazy'} className="object-cover" />
      </div>
      {children}
    </div>
  );
}
