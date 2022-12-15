import React, { ReactElement, ReactNode } from 'react';

import styles from 'features/PacksList/components/PacksTitle/style/packs-title.module.css';

import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectCardPacks } from 'common/store';

type PacksTitlePropsType = {
  title: string;
  packId?: string | undefined | null;
  isMy?: boolean;
  children: ReactNode;
};

export const PacksTitle = ({
  isMy = true,
  title,
  packId,
  children,
}: PacksTitlePropsType): ReactElement => {
  const cardsPacks = useAppSelector(selectCardPacks);

  const myPack = cardsPacks.find(
    // eslint-disable-next-line no-underscore-dangle
    (pack: { _id: string | null | undefined }): boolean => pack._id === packId,
  );

  const titleName = myPack ? myPack.name : title;

  return (
    <div className={styles.titleWrapper}>
      <h2 className={styles.title}>{titleName}</h2>
      {isMy && children}
    </div>
  );
};
