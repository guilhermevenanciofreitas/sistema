import { Sequelize as sequelize } from "sequelize-typescript";

import { Contrato } from "./models/contrato.model";
import { SaleOrder } from "./models/saleOrder.model";
import { TabelaPreco } from "./models/tabelaPreco.model";
import { User } from "./models/user.model";
import { Partner } from "./models/partner.model";
import { PartnerContact } from "./models/partnerContact.model";
import { PartnerAddress } from "./models/partnerAddress.model";
import { Product } from "./models/product.model";
import { Service } from "./models/service.model";
import { Company } from "./models/company.model";
import { Payment } from "./models/payment.model";
import { SaleOrderItem } from "./models/saleOrderItem.model";
import { Municipio } from "./models/municipio.model";
import { SaleOrderReceivie } from "./models/saleOrderReceivie.model";
import { SaleOrderStatus } from "./models/saleOrderStatus.model";
import { SaleOrderProgress } from "./models/saleOrderProgress.model";
import { SaleOrderShippingType } from "./models/saleOrderShippingType.model";
import { Delivery } from "./models/delivery.model";
import { DeliveryRoute } from "./models/deliveryRoute.model";
import { PedidoVendaDeliveryRoute } from "./models/pedidoVendaDeliveryRoute.model";
import { ProductCombination } from "./models/productCombination.model";
import { ProductCombinationGroup } from "./models/productCombinationGroup.model";
import { ProductCombinationItem } from "./models/productCombinationItem.model";
import { SaleOrderItemCombination } from "./models/saleOrderItemCombination.model";
import { SaleOrderItemCombinationItem } from "./models/saleOrderItemCombinationItem.model";
import { ProductCategory } from "./models/productCategory.model";
import { Nfe } from "./models/nfe.model";
import { ShippingOrder } from "./models/shippingOrder.model";
import { PaymentForm } from "./models/paymentForm.model";
import { BankAccount } from "./models/bankAccount.model";
import { Bank } from "./models/bank.model";
import { SaleOrderStatusByFrom } from "./models/saleOrderStatusByFrom.model";
import { BankAccountPaymentForm } from "./models/bankAccountPaymentForm.model";
import { PaymentCarried } from "./models/paymentCarried.model";
import { BankAccountShipping } from "./models/bankAccountShipping.model";
import { BankAccountShippingPayment } from "./models/bankAccountShippingPayment.model";
import { CalledOccurrence } from "./models/calledOccurrence.model";
import { Called } from "./models/called.model";
import { Task } from "./models/task.model";
import { CalledTask } from "./models/calledTask.model";
import { MesoRegion } from "./models/mesoRegion.model";
import { FreightCalculation } from "./models/freightCalculation.model";
import { FreightCalculationType } from "./models/freightCalculationType.model";
import { FreightCalculationWeight } from "./models/freightCalculationWeight.model";
import { FreightQuote } from "./models/freightQuote.model";
import { State } from "./models/state.model";
import { FreightCalculationRecipient } from "./models/freightCalculationRecipient.model";
import { SaleOrderNfe } from "./models/saleOrderNfe.model";
import { ProductSupplier } from "./models/productSupplier.model";
import { ReceivieForm } from "./models/ReceivieForm.model";


export { Payment } from "./models/payment.model";
export { Contrato } from "./models/contrato.model";
export { SaleOrder } from "./models/saleOrder.model";
export { SaleOrderItem } from "./models/saleOrderItem.model";
export { TabelaPreco } from "./models/tabelaPreco.model";
export { Partner } from "./models/partner.model";
export { PartnerContact } from "./models/partnerContact.model";
export { PartnerAddress } from "./models/partnerAddress.model";
export { Product } from "./models/product.model";
export { Service } from "./models/service.model";
export { Company } from "./models/company.model";
export { User } from "./models/user.model";
export { Municipio } from "./models/municipio.model";
export { SaleOrderReceivie } from "./models/saleOrderReceivie.model";
export { SaleOrderStatus } from "./models/saleOrderStatus.model";
export { SaleOrderProgress } from "./models/saleOrderProgress.model";
export { SaleOrderShippingType } from "./models/saleOrderShippingType.model";
export { Delivery } from "./models/delivery.model";
export { DeliveryRoute } from "./models/deliveryRoute.model";
export { PedidoVendaDeliveryRoute } from "./models/pedidoVendaDeliveryRoute.model";
export { ProductCombination } from "./models/productCombination.model";
export { ProductCombinationGroup } from "./models/productCombinationGroup.model";
export { ProductCombinationItem } from "./models/productCombinationItem.model";
export { SaleOrderItemCombination } from "./models/saleOrderItemCombination.model";
export { SaleOrderItemCombinationItem } from "./models/saleOrderItemCombinationItem.model";
export { ProductCategory } from "./models/productCategory.model";
export { Nfe } from "./models/nfe.model";
export { ShippingOrder } from "./models/shippingOrder.model";
export { PaymentForm } from "./models/paymentForm.model";
export { BankAccount } from "./models/bankAccount.model";
export { SaleOrderStatusByFrom } from "./models/saleOrderStatusByFrom.model";
export { BankAccountPaymentForm } from "./models/bankAccountPaymentForm.model";
export { PaymentCarried } from "./models/paymentCarried.model";
export { BankAccountShipping } from "./models/bankAccountShipping.model";
export { BankAccountShippingPayment } from "./models/bankAccountShippingPayment.model";
export { CalledOccurrence } from "./models/calledOccurrence.model";
export { Called } from "./models/called.model";
export { Task } from "./models/task.model";
export { CalledTask } from "./models/calledTask.model";
export { MesoRegion } from "./models/mesoRegion.model";
export { FreightCalculation } from "./models/freightCalculation.model";
export { FreightCalculationType } from "./models/freightCalculationType.model";
export { FreightCalculationWeight } from "./models/freightCalculationWeight.model";
export { FreightQuote } from "./models/freightQuote.model";
export { State } from "./models/state.model";
export { FreightCalculationRecipient } from "./models/freightCalculationRecipient.model";
export { SaleOrderNfe } from "./models/saleOrderNfe.model";
export { ProductSupplier } from "./models/productSupplier.model";
export { ReceivieForm } from "./models/ReceivieForm.model";


export default class Sequelize {
  
  public sequelize?: sequelize;

  constructor(options: any) {
    
    this.sequelize = new sequelize({
      ...options,
      
      dialect: "postgres",

      define: {timestamps: false},
      
      models: [Bank, BankAccount, BankAccountPaymentForm, BankAccountShipping, BankAccountShippingPayment, Called, CalledOccurrence, CalledTask, Payment, PaymentCarried, Contrato, Delivery, DeliveryRoute, SaleOrderStatus, SaleOrderStatusByFrom, SaleOrderShippingType, PedidoVendaDeliveryRoute, SaleOrderProgress, SaleOrder, PaymentForm, SaleOrderItem, SaleOrderNfe, SaleOrderReceivie, Company, Partner, PartnerContact, PartnerAddress, Product, ProductCategory, ProductCombinationGroup, ProductCombination, ProductSupplier, ReceivieForm, ProductCombinationItem, SaleOrderItemCombination, SaleOrderItemCombinationItem, Service, ShippingOrder, State, Task, User, TabelaPreco, Municipio, Nfe, MesoRegion, FreightCalculation, FreightCalculationRecipient, FreightCalculationType, FreightCalculationWeight, FreightQuote],
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    });


  }

}