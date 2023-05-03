import $ from 'jquery';

export function grids(){
    for (let i = 1; i <= 100; i++) {
      $('#grid1').append('<div class="grid-cell" id="cell1-' + i + '"></div>');
      $('#grid2').append('<div class="grid-cell" id="cell2-' + i + '"></div>');
    }
}