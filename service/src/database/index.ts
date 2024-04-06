import { Sequelize as sequelize } from "sequelize-typescript";

import { Contrato } from "./models/contrato.model";
import { SaleOrder } from "./models/saleOrder.model";
import { TabelaPreco } from "./models/tabelaPreco.model";
import { Usuario } from "./models/usuario.model";
import { Parceiro } from "./models/parceiro.model";
import { ParceiroContato } from "./models/parceiroContato.model";
import { ParceiroEndereco } from "./models/parceiroEndereco.model";
import { Product } from "./models/product.model";
import { Service } from "./models/service.model";
import { Company } from "./models/company.model";
import { Payment } from "./models/payment.model";
import { SaleOrderItem } from "./models/saleOrderItem.model";
import { Municipio } from "./models/municipio.model";
import { PedidoVendaPagamento } from "./models/pedidoVendaPagamento.model";
import { SaleOrderStatus } from "./models/saleOrderStatus.model";
import { PedidoVendaAndamento } from "./models/pedidoVendaAndamento.model";
import { PedidoVendaTipoEntrega } from "./models/pedidoVendaTipoEntrega.model";
import { Delivery } from "./models/delivery.model";
import { DeliveryRoute } from "./models/deliveryRoute.model";
import { PedidoVendaDeliveryRoute } from "./models/pedidoVendaDeliveryRoute.model";
import { ProdutoCombinacao } from "./models/produtoCombinacao.model";
import { ProdutoCombinacaoGrupo } from "./models/produtoCombinacaoGrupo.model";
import { ProdutoCombinacaoItem } from "./models/produtoCombinacaoItem.model";
import { PedidoVendaItemCombinacao } from "./models/pedidoVendaItemCombinacao.model";
import { PedidoVendaItemCombinacaoItem } from "./models/pedidoVendaItemCombinacaoItem.model";
import { ProductCategory } from "./models/productCategory.model";
import { Nfe } from "./models/nfe.model";
import { ShippingOrder } from "./models/shippingOrder.model";
import { FormOfPayment } from "./models/formOfPayment.model";
import { BankAccount } from "./models/bankAccount.model";
import { Bank } from "./models/bank.model";
import { SaleOrderStatusByFrom } from "./models/saleOrderStatusByFrom.model";


export { Payment } from "./models/payment.model";
export { Contrato } from "./models/contrato.model";
export { SaleOrder } from "./models/saleOrder.model";
export { SaleOrderItem } from "./models/saleOrderItem.model";
export { TabelaPreco } from "./models/tabelaPreco.model";
export { Parceiro } from "./models/parceiro.model";
export { ParceiroContato } from "./models/parceiroContato.model";
export { ParceiroEndereco } from "./models/parceiroEndereco.model";
export { Product } from "./models/product.model";
export { Service } from "./models/service.model";
export { Company } from "./models/company.model";
export { Usuario } from "./models/usuario.model";
export { Municipio } from "./models/municipio.model";
export { PedidoVendaPagamento } from "./models/pedidoVendaPagamento.model";
export { SaleOrderStatus } from "./models/saleOrderStatus.model";
export { PedidoVendaAndamento } from "./models/pedidoVendaAndamento.model";
export { PedidoVendaTipoEntrega } from "./models/pedidoVendaTipoEntrega.model";
export { Delivery } from "./models/delivery.model";
export { DeliveryRoute } from "./models/deliveryRoute.model";
export { PedidoVendaDeliveryRoute } from "./models/pedidoVendaDeliveryRoute.model";
export { ProdutoCombinacao } from "./models/produtoCombinacao.model";
export { ProdutoCombinacaoGrupo } from "./models/produtoCombinacaoGrupo.model";
export { ProdutoCombinacaoItem } from "./models/produtoCombinacaoItem.model";
export { PedidoVendaItemCombinacao } from "./models/pedidoVendaItemCombinacao.model";
export { PedidoVendaItemCombinacaoItem } from "./models/pedidoVendaItemCombinacaoItem.model";
export { ProductCategory } from "./models/productCategory.model";
export { Nfe } from "./models/nfe.model";
export { ShippingOrder } from "./models/shippingOrder.model";
export { FormOfPayment } from "./models/formOfPayment.model";
export { BankAccount } from "./models/bankAccount.model";
export { SaleOrderStatusByFrom } from "./models/saleOrderStatusByFrom.model";


export default class Sequelize {
  
  public sequelize?: sequelize;

  constructor(options: any) {
    this.sequelize = new sequelize({
      ...options,
      
      dialect: "postgres",
      define: {timestamps: false},
      models: [Bank, BankAccount, Payment, Contrato, Delivery, DeliveryRoute, SaleOrderStatus, SaleOrderStatusByFrom, PedidoVendaTipoEntrega, PedidoVendaDeliveryRoute, PedidoVendaAndamento, SaleOrder, FormOfPayment, SaleOrderItem, PedidoVendaPagamento, Company, Parceiro, ParceiroContato, ParceiroEndereco, Product, ProductCategory, ProdutoCombinacaoGrupo, ProdutoCombinacao, ProdutoCombinacaoItem, PedidoVendaItemCombinacao, PedidoVendaItemCombinacaoItem, Service, ShippingOrder, Usuario, TabelaPreco, Municipio, Nfe],
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    });
  }

}