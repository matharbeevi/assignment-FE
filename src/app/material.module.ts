// material.module.ts

import { NgModule } from '@angular/core';

import { MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})

export class MaterialModule {}