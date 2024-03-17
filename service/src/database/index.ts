import { Sequelize as sequelize } from "sequelize-typescript";

import { Contrato } from "./models/contrato.model";
import { PedidoVenda } from "./models/pedidoVenda.model";
import { TabelaPreco } from "./models/tabelaPreco.model";
import { Usuario } from "./models/usuario.model";
import { Parceiro } from "./models/parceiro.model";
import { ParceiroContato } from "./models/parceiroContato.model";
import { ParceiroEndereco } from "./models/parceiroEndereco.model";
import { Produto } from "./models/produto.model";
import { Servico } from "./models/servico.model";
import { Empresa } from "./models/empresa.model";
import { ContaPagar } from "./models/contaPagar.model";
import { PedidoVendaItem } from "./models/pedidoVendaItem.model";
import { Municipio } from "./models/municipio.model";
import { FormaPagamento } from "./models/formaPagamento.model";
import { PedidoVendaPagamento } from "./models/pedidoVendaPagamento.model";
import { PedidoVendaStatus } from "./models/pedidoVendaStatus.model";
import { PedidoVendaAndamento } from "./models/pedidoVendaAndamento.model";
import { PedidoVendaTipoEntrega } from "./models/pedidoVendaTipoEntrega.model";
import { Delivery } from "./models/delivery.model";
import { DeliveryRoute } from "./models/deliveryRoute.model";
import { PedidoVendaDeliveryRoute } from "./models/pedidoVendaDeliveryRoute.model";


export { ContaPagar } from "./models/contaPagar.model";
export { Contrato } from "./models/contrato.model";
export { PedidoVenda } from "./models/pedidoVenda.model";
export { PedidoVendaItem } from "./models/pedidoVendaItem.model";
export { TabelaPreco } from "./models/tabelaPreco.model";
export { Parceiro } from "./models/parceiro.model";
export { ParceiroContato } from "./models/parceiroContato.model";
export { ParceiroEndereco } from "./models/parceiroEndereco.model";
export { Produto } from "./models/produto.model";
export { Servico } from "./models/servico.model";
export { Empresa } from "./models/empresa.model";
export { Usuario } from "./models/usuario.model";
export { Municipio } from "./models/municipio.model";
export { FormaPagamento } from "./models/formaPagamento.model";
export { PedidoVendaPagamento } from "./models/pedidoVendaPagamento.model";
export { PedidoVendaStatus } from "./models/pedidoVendaStatus.model";
export { PedidoVendaAndamento } from "./models/pedidoVendaAndamento.model";
export { PedidoVendaTipoEntrega } from "./models/pedidoVendaTipoEntrega.model";
export { Delivery } from "./models/delivery.model";
export { DeliveryRoute } from "./models/deliveryRoute.model";
export { PedidoVendaDeliveryRoute } from "./models/pedidoVendaDeliveryRoute.model";


export default class Sequelize {
  
  public sequelize: sequelize | undefined;

  constructor(options: any) {
    this.sequelize = new sequelize({
      ...options,
      
      dialect: "postgres",
      define: {timestamps: false},
      models: [ContaPagar, Contrato, Delivery, DeliveryRoute, PedidoVendaStatus, PedidoVendaTipoEntrega, PedidoVendaDeliveryRoute, PedidoVendaAndamento, PedidoVenda, FormaPagamento, PedidoVendaItem, PedidoVendaPagamento, Empresa, Parceiro, ParceiroContato, ParceiroEndereco, Produto, Servico, Usuario, TabelaPreco, Municipio],
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    });
  }

}