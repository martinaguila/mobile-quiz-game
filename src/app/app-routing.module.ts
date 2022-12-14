import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'two-pics',
    loadChildren: () => import('./two-pics/two-pics.module').then( m => m.TwoPicsPageModule)
  },
  {
    path: 'quiz-game',
    loadChildren: () => import('./quiz-game/quiz-game.module').then( m => m.QuizGamePageModule)
  },
  {
    path: 'game-over/:status/:score/:level',
    loadChildren: () => import('./game-over/game-over.module').then( m => m.GameOverPageModule)
  },
  {
    path: 'instructions',
    loadChildren: () => import('./instructions/instructions.module').then( m => m.InstructionsPageModule)
  },
  {
    path: 'select-category',
    loadChildren: () => import('./select-category/select-category.module').then( m => m.SelectCategoryPageModule)
  },
  {
    path: 'new-quiz/:category',
    loadChildren: () => import('./new-quiz/new-quiz.module').then( m => m.NewQuizPageModule)
  },
  {
    path: 'map-view',
    loadChildren: () => import('./map-view/map-view.module').then( m => m.MapViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
