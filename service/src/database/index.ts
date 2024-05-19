import { Sequelize as sequelize } from "sequelize-typescript";

import { Bank } from "./models/bank.model";
import { Contract } from "./models/contract.model";
import { SaleOrder } from "./models/saleOrder.model";
import { ProductPrice } from "./models/productPrice.model";
import { User } from "./models/user.model";
import { Partner } from "./models/partner.model";
import { PartnerContact } from "./models/partnerContact.model";
import { PartnerAddress } from "./models/partnerAddress.model";
import { Product } from "./models/product.model";
import { Service } from "./models/service.model";
import { Company } from "./models/company.model";
import { Payment } from "./models/payment.model";
import { SaleOrderItem } from "./models/saleOrderItem.model";
import { City } from "./models/city.model";
import { SaleOrderReceivie } from "./models/saleOrderReceivie.model";
import { SaleOrderStatus } from "./models/saleOrderStatus.model";
import { SaleOrderProgress } from "./models/saleOrderProgress.model";
import { SaleOrderShippingType } from "./models/saleOrderShippingType.model";
import { Delivery } from "./models/delivery.model";
import { DeliveryRoute } from "./models/deliveryRoute.model";
import { SaleOrderDeliveryRoute } from "./models/SaleOrderDeliveryRoute.model";
import { ProductCombination } from "./models/productCombination.model";
import { Combination } from "./models/combination.model";
import { ProductCombinationItem } from "./models/productCombinationItem.model";
import { SaleOrderItemCombination } from "./models/saleOrderItemCombination.model";
import { SaleOrderItemCombinationItem } from "./models/saleOrderItemCombinationItem.model";
import { ProductCategory } from "./models/productCategory.model";
import { Nfe } from "./models/nfe.model";
import { ShippingOrder } from "./models/shippingOrder.model";
import { PaymentForm } from "./models/paymentForm.model";
import { BankAccount } from "./models/bankAccount.model";

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
import { ShippingOrderStatus } from "./models/shippingOrderStatus.model";
import { Vehicle } from "./models/vehicle.model";
import { Cte } from "./models/cte.model";
import { ShippingOrderNfe } from "./models/shippingOrderNfe.model";
import { StockLocation } from "./models/stockLocation.model";
import { StockIn } from "./models/stockIn.model";
import { StockInProduct } from "./models/stockInProduct.model";
import { Dfe } from "./models/dfe.model";
import { DfeProcNfe } from "./models/dfeProcNfe.model";
import { DfeResNfe } from "./models/dfeResNfe.model";
import { MeasurementUnit } from "./models/measurementUnit.model";
import { LegalNature } from "./models/legalNature.model";
import { EconomicActivity } from "./models/economicActivity.model";
import { ProductSubCategory } from "./models/productSubCategory.model";
import { Trip } from "./models/trip.model";
import { TripCte } from "./models/tripCte.model";
import { TripShippingOrder } from "./models/tripShippingOrder.model";
import { TripVehicle } from "./models/tripVehicle.model";

export { Payment } from "./models/payment.model";
export { Contract } from "./models/contract.model";
export { SaleOrder } from "./models/saleOrder.model";
export { SaleOrderItem } from "./models/saleOrderItem.model";
export { ProductPrice } from "./models/productPrice.model";
export { Partner } from "./models/partner.model";
export { PartnerContact } from "./models/partnerContact.model";
export { PartnerAddress } from "./models/partnerAddress.model";
export { Product } from "./models/product.model";
export { Service } from "./models/service.model";
export { Company } from "./models/company.model";
export { User } from "./models/user.model";
export { City } from "./models/city.model";
export { SaleOrderReceivie } from "./models/saleOrderReceivie.model";
export { SaleOrderStatus } from "./models/saleOrderStatus.model";
export { SaleOrderProgress } from "./models/saleOrderProgress.model";
export { SaleOrderShippingType } from "./models/saleOrderShippingType.model";
export { Delivery } from "./models/delivery.model";
export { DeliveryRoute } from "./models/deliveryRoute.model";
export { SaleOrderDeliveryRoute } from "./models/SaleOrderDeliveryRoute.model";
export { ProductCombination } from "./models/productCombination.model";
export { Combination } from "./models/combination.model";
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
export { ShippingOrderStatus } from "./models/shippingOrderStatus.model";
export { Vehicle } from "./models/vehicle.model";
export { Cte } from "./models/cte.model";
export { ShippingOrderNfe } from "./models/shippingOrderNfe.model";
export { StockLocation } from "./models/stockLocation.model";
export { StockIn } from "./models/stockIn.model";
export { StockInProduct } from "./models/stockInProduct.model";
export { Dfe } from "./models/dfe.model";
export { DfeProcNfe } from "./models/dfeProcNfe.model";
export { DfeResNfe } from "./models/dfeResNfe.model";
export { MeasurementUnit } from "./models/measurementUnit.model";
export { LegalNature } from "./models/legalNature.model";
export { EconomicActivity } from "./models/economicActivity.model";
export { ProductSubCategory } from "./models/productSubCategory.model";
export { Trip } from "./models/trip.model";
export { TripCte } from "./models/tripCte.model";
export { TripShippingOrder } from "./models/tripShippingOrder.model";
export { TripVehicle } from "./models/tripVehicle.model";


export default class Sequelize {
  
  public sequelize?: sequelize;

  constructor(options: any) {
    
    this.sequelize = new sequelize({
      ...options,
      
      dialect: "postgres",

      define: {timestamps: false},
      
      models: [
        Bank,
        BankAccount,
        BankAccountPaymentForm,
        BankAccountShipping,
        BankAccountShippingPayment,
        Called,
        CalledOccurrence,
        CalledTask,
        City,
        Combination,
        Company,
        Contract,
        Cte, 
        Delivery,
        DeliveryRoute,
        Dfe,
        DfeProcNfe,
        DfeResNfe,
        EconomicActivity,
        FreightCalculation,
        FreightCalculationRecipient,
        FreightCalculationType,
        FreightCalculationWeight,
        FreightQuote,
        LegalNature,
        MeasurementUnit,
        MesoRegion,
        Nfe,
        Partner,
        PartnerAddress,
        PartnerContact,
        Payment,
        PaymentCarried,
        PaymentForm,
        Product,
        ProductCategory,
        ProductCombination,
        ProductCombinationItem,
        ProductPrice,
        ProductSubCategory,
        ProductSupplier,
        ReceivieForm,
        SaleOrder,
        SaleOrderDeliveryRoute,
        SaleOrderItem,
        SaleOrderItemCombination,
        SaleOrderItemCombinationItem,
        SaleOrderNfe,
        SaleOrderProgress,
        SaleOrderReceivie,
        SaleOrderShippingType,
        SaleOrderStatus,
        SaleOrderStatusByFrom, 
        Service,
        ShippingOrder,
        ShippingOrderNfe,
        ShippingOrderStatus,
        State,
        StockIn,
        StockInProduct,
        StockLocation,
        Task,
        Trip,
        TripCte,
        TripShippingOrder,
        TripVehicle,
        User, 
        Vehicle
      ],
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    });


  }

}