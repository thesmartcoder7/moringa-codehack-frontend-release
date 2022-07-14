import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'prismjs';
import 'prismjs/components/prism-pug.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-scss.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-python.js';

import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/show-language/prism-show-language';

declare var Prism: any;

@Injectable({
  providedIn: 'root',
})
export class SyntaxHighlightService {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}
  highlight() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
