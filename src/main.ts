import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

const cursorDot = document.querySelector('[data-cursor-dot]') as HTMLElement;
const cursorOutline = document.querySelector(
  '[data-cursor-outline]'
) as HTMLElement;

if (cursorDot && cursorOutline) {
  cursorDot.style.pointerEvents = 'none';
  cursorOutline.style.pointerEvents = 'none';

  window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: 'forwards' }
    );
  });
} else {
  console.error('Cursor elements not found in the document.');
}
