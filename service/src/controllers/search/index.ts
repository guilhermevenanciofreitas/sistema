import { Request, Response } from "express";
import Auth from "../../auth";
import { FormaPagamento, Municipio, Parceiro, PedidoVendaTipoEntrega, Produto, ProdutoCategoria, ProdutoCombinacao, ProdutoCombinacaoGrupo, ProdutoCombinacaoItem, TabelaPreco } from "../../database";
import { Op } from "sequelize";

export default class SearchController {

    async tabelasPreco(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                if (req.body?.Search) {
                    where = {"descricao": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const tabelasPreco = await TabelaPreco.findAll({attributes: ["id", "descricao"], where, order: [["descricao", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(tabelasPreco);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async cliente(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                where = {"isCliente": true};

                if (req.body?.Search) {
                    where = {"nome": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const clientes = await Parceiro.findAll({attributes: ["id", "cpfCnpj", "nome", "isBloquearVenda"], where, order: [["nome", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(clientes);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async funcionario(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                where = {"isFuncionario": true};

                if (req.body?.Search) {
                    where = {"nome": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const clientes = await Parceiro.findAll({attributes: ["id", "cpfCnpj", "nome"], where, order: [["nome", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(clientes);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async produto(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                //where = {"isCliente": true};

                if (req.body?.Search) {
                    where = {"descricao": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const produtos = await Produto.findAll({attributes: ["id", "descricao"],
                    include: [{model: ProdutoCombinacao, attributes: ["id", "isObrigatorio", "minimo", "maximo"],
                        include: [{model: ProdutoCombinacaoGrupo, attributes: ["id", "descricao"],
                            include: [{model: ProdutoCombinacaoItem, attributes: ["id", "descricao"]}]    
                        }]
                    }],
                    where, order: [["descricao", "asc"]], transaction
                });
        
                sequelize.close();

                res.status(200).json(produtos);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async municipio(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"nome": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                if (req.body?.estadoId) {
                    where = {"estadoId": {[Op.eq]: req.body?.estadoId}};
                }
        
                const municipios = await Municipio.findAll({attributes: ["id", "nome"], where, order: [["nome", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(municipios);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async formaPagamento(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"descricao": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const formaPagamentos = await FormaPagamento.findAll({attributes: ["id", "descricao"], where, order: [["descricao", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(formaPagamentos);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async tipoEntrega(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"descricao": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const tipoEntregas = await PedidoVendaTipoEntrega.findAll({attributes: ["id", "descricao"], where, order: [["descricao", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(tipoEntregas);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async produtoCategoria(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"descricao": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const produtoCategoria = await ProdutoCategoria.findAll({attributes: ["id", "descricao"], where, order: [["descricao", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(produtoCategoria);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async produtoCombinacaoGrupo(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"descricao": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const produtoCombinacaoGrupo = await ProdutoCombinacaoGrupo.findAll({attributes: ["id", "descricao"], where, order: [["descricao", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(produtoCombinacaoGrupo);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }
}