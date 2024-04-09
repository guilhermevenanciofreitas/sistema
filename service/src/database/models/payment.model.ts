import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Partner } from "./partner.model";
import { PaymentForm } from "./paymentForm.model";
import { BankAccount } from "./bankAccount.model";
import { Company } from "./company.model";

@Table({tableName: "payment"})
export class Payment extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "companyId"})
  companyId?: string;

  @Column({type: DataType.STRING(30), field: "number"})
  number?: string;

  @Column({type: DataType.STRING, field: "numeroDocumento"})
  numeroDocumento?: string;

  @Column({type: DataType.STRING, field: "status"})
  status?: "pending" | "open" | "shipping" | "send" | "paid";

  @Column({type: DataType.UUID, field: "recebedorId"})
  recebedorId?: string;

  @Column({type: DataType.STRING(100), field: "beneficiaryNotice"})
  beneficiaryNotice?: string;

  @Column({type: DataType.UUID, field: "paymentFormId"})
  paymentFormId?: string;

  @Column({type: DataType.UUID, field: "bankAccountId"})
  bankAccountId?: string;

  @Column({type: DataType.DATE, field: "emissao"})
  emissao?: Date;

  @Column({type: DataType.DATE, field: "vencimento"})
  vencimento?: Date;

  @Column({type: DataType.STRING(20), field: "ourNumber"})
  ourNumber?: string;

  @Column({type: DataType.DECIMAL(18, 2), field: "valor"})
  valor?: number;

  @Column({type: DataType.UUID, field: "pagamentoId"})
  pagamentoId?: string;

  @Column({type: DataType.JSONB, field: "data"})
  data?: any;

  @BelongsTo(() => Company, 'companyId')
  company?: Company | null;

  @BelongsTo(() => Partner, 'recebedorId')
  recebedor?: Partner;

  @BelongsTo(() => PaymentForm, 'paymentFormId')
  paymentForm?: PaymentForm;

  @BelongsTo(() => BankAccount, 'bankAccountId')
  bankAccount?: BankAccount;
  
}