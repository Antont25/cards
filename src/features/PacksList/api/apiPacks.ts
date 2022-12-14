import { instance } from 'app/api/app-api';
import {
  NewPackType,
  PacksGetParamsType,
  PacksType,
  UpdatePackType,
} from 'features/PacksList/types';

export const apiPacks = {
  getPacks(params: PacksGetParamsType) {
    return instance.get<PacksType>('cards/pack', { params }).then(res => res.data);
  },
  addNewPack(newPack: NewPackType) {
    return instance.post('cards/pack', { cardsPack: newPack });
  },
  deletePack(id: string) {
    return instance.delete(`cards/pack`, { params: { id } });
  },
  changePackName(updatedPack: UpdatePackType) {
    return instance.put('cards/pack', { cardsPack: updatedPack });
  },
};
