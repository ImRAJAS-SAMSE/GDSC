import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-team',
  standalone: true,
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent implements OnInit, OnDestroy {
  private wrapper!: HTMLElement;
  private carousel!: HTMLElement;
  private firstCardWidth!: number;
  private arrowBtns!: NodeListOf<HTMLElement>;
  private carouselChildrens!: HTMLElement[];
  private isDragging: boolean = false;
  private isAutoPlay: boolean = true;
  private startX!: number;
  private startScrollLeft!: number;
  private timeoutId!: number;
  private cardPerView!: number;

  ngOnInit(): void {
    this.wrapper = document.querySelector('.wrapper') as HTMLElement;
    this.carousel = document.querySelector('.carousel') as HTMLElement;
    this.firstCardWidth = (
      this.carousel.querySelector('.card') as HTMLElement
    ).offsetWidth;
    this.arrowBtns = document.querySelectorAll('.wrapper i');
    this.carouselChildrens = Array.from(
      this.carousel.children
    ) as HTMLElement[];

    this.cardPerView = Math.round(
      this.carousel.offsetWidth / this.firstCardWidth
    );

    this.carouselChildrens
      .slice(-this.cardPerView)
      .reverse()
      .forEach((card: HTMLElement) => {
        this.carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
      });

    this.carouselChildrens
      .slice(0, this.cardPerView)
      .forEach((card: HTMLElement) => {
        this.carousel.insertAdjacentHTML('beforeend', card.outerHTML);
      });

    this.carousel.classList.add('no-transition');
    this.carousel.scrollLeft = this.carousel.offsetWidth;
    this.carousel.classList.remove('no-transition');

    this.arrowBtns.forEach((btn: HTMLElement) => {
      btn.addEventListener('click', () => {
        this.carousel.scrollLeft +=
          btn.id == 'left' ? -this.firstCardWidth : this.firstCardWidth;
      });
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  dragStart(e: MouseEvent): void {
    this.isDragging = true;
    this.carousel.classList.add('dragging');
    this.startX = e.pageX;
    this.startScrollLeft = this.carousel.scrollLeft;
  }

  dragging(e: MouseEvent): void {
    if (!this.isDragging) return;
    this.carousel.scrollLeft = this.startScrollLeft - (e.pageX - this.startX);
  }

  dragStop(): void {
    this.isDragging = false;
    this.carousel.classList.remove('dragging');
  }

  infiniteScroll(): void {
    if (this.carousel.scrollLeft === 0) {
      this.carousel.classList.add('no-transition');
      this.carousel.scrollLeft =
        this.carousel.scrollWidth - 2 * this.carousel.offsetWidth;
      this.carousel.classList.remove('no-transition');
    } else if (
      Math.ceil(this.carousel.scrollLeft) ===
      this.carousel.scrollWidth - this.carousel.offsetWidth
    ) {
      this.carousel.classList.add('no-transition');
      this.carousel.scrollLeft = this.carousel.offsetWidth;
      this.carousel.classList.remove('no-transition');
    }

    clearTimeout(this.timeoutId);
    if (!this.wrapper.matches(':hover')) this.autoPlay();
  }

  autoPlay(): void {
    if (window.innerWidth < 800 || !this.isAutoPlay) return;
    this.timeoutId = setTimeout(
      () => (this.carousel.scrollLeft += this.firstCardWidth),
      2500
    );
  }
}
