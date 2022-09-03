import React from 'react';
import styles from './not-found.module.css';
import indexStyles from './index.module.css';

export function NotFound404() {
  const message = 'Error 404: Page not found'.split('');
  return (
    <main className={`${indexStyles.main} ${styles.main}`}>
      <div>
        {message.map((letter, index) => {
          return (
            <span
              className={styles.animate}
              key={index}
              style={{
                animationDuration: 110 * message.length + 'ms',
                animationDelay: 40 * index + 'ms',
                animationIterationCount: 'infinite'
              }}
            >
              {letter}
            </span>
          )
        })}
      </div>
    </main>
  );
}
