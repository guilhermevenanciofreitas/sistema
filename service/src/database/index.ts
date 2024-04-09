import { Sequelize as sequelize } from "sequelize-typescript";

import { Contrato } from "./models/contrato.model";
import { SaleOrder } from "./models/saleOrder.model";
import { TabelaPreco } from "./models/tabelaPreco.model";
import { User } from "./models/user.model";
import { Partner } from "./models/partner.model";
import { ParceiroContato } from "./models/parceiroContato.model";
import { ParceiroEndereco } from "./models/parceiroEndereco.model";
import { Product } from "./models/product.model";
import { Service } from "./models/service.model";
import { Company } from "./models/company.model";
import { Payment } from "./models/payment.model";
import { SaleOrderItem } from "./models/saleOrderItem.model";
import { Municipio } from "./models/municipio.model";
import { SaleOrderRecieve } from "./models/saleOrderRecieve.model";
import { SaleOrderStatus } from "./models/saleOrderStatus.model";
import { SaleOrderProgress } from "./models/saleOrderProgress.model";
import { PedidoVendaTipoEntrega } from "./models/pedidoVendaTipoEntrega.model";
import { Delivery } from "./models/delivery.model";
import { DeliveryRoute } from "./models/deliveryRoute.model";
import { PedidoVendaDeliveryRoute } from "./models/pedidoVendaDeliveryRoute.model";
import { ProdutoCombinacao } from "./models/produtoCombinacao.model";
import { ProdutoCombinacaoGrupo } from "./models/produtoCombinacaoGrupo.model";
import { ProdutoCombinacaoItem } from "./models/produtoCombinacaoItem.model";
import { SaleOrderItemCombination } from "./models/saleOrderItemCombination.model";
import { PedidoVendaItemCombinacaoItem } from "./models/pedidoVendaItemCombinacaoItem.model";
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


export { Payment } from "./models/payment.model";
export { Contrato } from "./models/contrato.model";
export { SaleOrder } from "./models/saleOrder.model";
export { SaleOrderItem } from "./models/saleOrderItem.model";
export { TabelaPreco } from "./models/tabelaPreco.model";
export { Partner } from "./models/partner.model";
export { ParceiroContato } from "./models/parceiroContato.model";
export { ParceiroEndereco } from "./models/parceiroEndereco.model";
export { Product } from "./models/product.model";
export { Service } from "./models/service.model";
export { Company } from "./models/company.model";
export { User } from "./models/user.model";
export { Municipio } from "./models/municipio.model";
export { SaleOrderRecieve } from "./models/saleOrderRecieve.model";
export { SaleOrderStatus } from "./models/saleOrderStatus.model";
export { SaleOrderProgress } from "./models/saleOrderProgress.model";
export { PedidoVendaTipoEntrega } from "./models/pedidoVendaTipoEntrega.model";
export { Delivery } from "./models/delivery.model";
export { DeliveryRoute } from "./models/deliveryRoute.model";
export { PedidoVendaDeliveryRoute } from "./models/pedidoVendaDeliveryRoute.model";
export { ProdutoCombinacao } from "./models/produtoCombinacao.model";
export { ProdutoCombinacaoGrupo } from "./models/produtoCombinacaoGrupo.model";
export { ProdutoCombinacaoItem } from "./models/produtoCombinacaoItem.model";
export { SaleOrderItemCombination } from "./models/saleOrderItemCombination.model";
export { PedidoVendaItemCombinacaoItem } from "./models/pedidoVendaItemCombinacaoItem.model";
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


export default class Sequelize {
  
  public sequelize?: sequelize;

  constructor(options: any) {
    
    this.sequelize = new sequelize({
      ...options,
      
      dialect: "postgres",

      define: {timestamps: false},
      
      models: [Bank, BankAccount, BankAccountPaymentForm, BankAccountShipping, BankAccountShippingPayment, Payment, PaymentCarried, Contrato, Delivery, DeliveryRoute, SaleOrderStatus, SaleOrderStatusByFrom, PedidoVendaTipoEntrega, PedidoVendaDeliveryRoute, SaleOrderProgress, SaleOrder, PaymentForm, SaleOrderItem, SaleOrderRecieve, Company, Partner, ParceiroContato, ParceiroEndereco, Product, ProductCategory, ProdutoCombinacaoGrupo, ProdutoCombinacao, ProdutoCombinacaoItem, SaleOrderItemCombination, PedidoVendaItemCombinacaoItem, Service, ShippingOrder, User, TabelaPreco, Municipio, Nfe],
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    });


  }

}