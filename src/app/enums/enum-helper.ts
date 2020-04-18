import { RankingEnum } from './ranking-enum';
import { EnumDisplayedObject } from './displayed-object-enum';
import { ProductEnum } from './product-enum';

// tslint:disable-next-line: no-namespace
export namespace EnumHelper {

    const createEnumObject = (value: number, label: string) => {
        const enumObj = new EnumDisplayedObject();
        enumObj.Value = value;
        enumObj.Label = label;
        return enumObj;
    };

    export const initRankingValues = () => {
        return Object.entries(RankingEnum)
                    .filter(e => !isNaN(e[0] as any))
                    .map(e => (createEnumObject(Number(e[0]), e[1])));
    };

    export const initProductValues = () => {
        return Object.entries(ProductEnum)
                    .filter(e => !isNaN(e[0] as any))
                    .map(e => (createEnumObject(Number(e[0]), e[1])));
    };
}
