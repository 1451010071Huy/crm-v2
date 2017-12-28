import { Pipe, PipeTransform } from '@angular/core';
import { Component } from "@angular/core";
import { forEach } from '@angular/router/src/utils/collection';
@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any, searchText: string): any {
        if (!items) return [];
        if (!searchText) return items;
        return items.filter(item =>
            Object.keys(item).some(k => item[k] != null &&
                item[k].toString().toLowerCase()
                    .includes(searchText.toLowerCase())),
        );
    }
}
