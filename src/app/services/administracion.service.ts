import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, firstValueFrom } from 'rxjs';
import { HttpClientUtils } from '../utils/http-client.utils';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  private com_id = 1;
  private uidreg = 8;
  constructor(private httpClientUtils: HttpClientUtils) { }

  postGetMenuSel(data: any) {
    return this.httpClientUtils.postQuery('user/menu-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetComprobanteDefectoGuia(data: any) {
    return this.httpClientUtils.postQuery('master/guidevoucher-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetComprobanteDefectoVenta(data: any) {
    return this.httpClientUtils.postQuery('master/typesaledocument-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetTipoImpresion(data: any) {
    return this.httpClientUtils.postQuery('master/typeprint-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetCompanyRegister(data: any) {
    return this.httpClientUtils.postQuery('user/company-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetCompanyList(data: any) {
    return this.httpClientUtils.postQuery('user/company-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetBankRegister(data: any) {
    data['p_com_id'] = this.com_id;
    console.log(data);
    return this.httpClientUtils.postQuery('master/bank-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetBankList(data: any) {
    data['p_com_id'] = this.com_id;

    return this.httpClientUtils.postQuery('master/bank-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetAccountBankList(data: any) {
    data['p_com_id'] = this.com_id;
    return this.httpClientUtils.postQuery('master/accountbank-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetBankAccountTypeList(data: any) {
    return this.httpClientUtils.postQuery('master/bankaccounttype-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postBankAccountRegister(data: any) {
    return this.httpClientUtils.postQuery('master/accountbank-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postMethodPaymentRegister(data: any) {
    return this.httpClientUtils.postQuery('master/methodpayment-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postMethodPaymentList(data: any) {
    return this.httpClientUtils.postQuery('master/methodpayment-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetGenderTypeList(data: any) {
    return this.httpClientUtils.postQuery('master/gendertype-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetTypeDocumentIdentityList(data: any) {
    return this.httpClientUtils.postQuery('master/typeidentitydocument-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }


  postClientRegister(data: any) {
    return this.httpClientUtils.postQuery('client/client-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetClientList(data: any) {
    return this.httpClientUtils.postQuery('client/client-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postProviderRegister(data: any) {
    return this.httpClientUtils.postQuery('provider/provider-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }


  postGetProviderList(data: any) {
    return this.httpClientUtils.postQuery('provider/provider-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postSalePointRegister(data: any) {
    return this.httpClientUtils.postQuery('master/pointsale-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetSalePointList(data: any) {
    data['p_com_id'] = this.com_id;
    return this.httpClientUtils.postQuery('master/pointsale-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postSaleStationRegister(data: any) {
    return this.httpClientUtils.postQuery('master/saltestation-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postSaleStationList(data: any) {
    data['p_com_id'] = this.com_id;
    return this.httpClientUtils.postQuery('master/saltestation-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetCategoryList(data: any) {
    data['p_com_id'] = this.com_id;
    return this.httpClientUtils.postQuery('product/category-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postCategoryRegister(data: any) {
    data['p_com_id'] = this.com_id;
    data['p_cat_uidreg'] = this.uidreg;
    return this.httpClientUtils.postQuery('product/category-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetBrandList(data: any) {
    data['p_com_id'] = this.com_id;
    return this.httpClientUtils.postQuery('product/brand-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postBrandRegister(data: any) {
    data['p_com_id'] = this.com_id;
    data['p_uidreg'] = this.uidreg;
    return this.httpClientUtils.postQuery('product/brand-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postModelRegister(data: any) {
    data['p_com_id'] = this.com_id;
    data['p_uidreg'] = this.uidreg;
    return this.httpClientUtils.postQuery('product/model-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetModelList(data: any) {
    data['p_com_id'] = this.com_id;
    return this.httpClientUtils.postQuery('product/model-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postCharacteristicsModelRegister(data: any) {
    data['p_com_id'] = this.com_id;
    return this.httpClientUtils.postQuery('product/characteristics-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postCharacteristicsModelMasiveRegister(data: any) {
    data['p_com_id'] = this.com_id;
    data['p_uidreg'] = this.uidreg;
    return this.httpClientUtils.postQuery('product/characteristicsmodelmasive-reg', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  postGetCharacteristicList(data: any) {
    data['p_com_id'] = this.com_id;
    return this.httpClientUtils.postQuery('product/characteristics-sel', data).pipe(
      map(data => {
        return data;
      })
    );
  }


}
