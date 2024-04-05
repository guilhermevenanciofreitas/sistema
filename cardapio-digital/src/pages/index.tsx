import HomeBase from "./index.base";
import _ from "lodash";
import './styles.css';
import ProductDetail from "./productDetail";

export class Home extends HomeBase {

    obterDiaSemana = (date: Date) => {
        var diaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado-feira"];
        return diaSemana[date.getDay()];
    }

    Category = (): React.ReactElement => {

        return (
            <div className="row col-12 pl-0 pr-0 ml-0 mt-2">
                <div style={{ overflowX: 'scroll', width: '100%', height: '180px' }}>
                    <div className='Title'>Categorias</div>
                    <div className='CategorySlider'>
                        <div className='CategoryItem' onClick={() => this.setState({categoriaId: undefined})}>
                            <img style={{ width: 56, height: 56 }} src={`https://cdn.icon-icons.com/icons2/1674/PNG/512/doneall_111167.png`} />
                            <div className='CategoryItemTitle'>Todas</div>
                        </div>
                        {_.map(this.state.data.categorias, (categoria: any) => {

                            const src = !categoria.imagem?.data ? "https://static-00.iconduck.com/assets.00/no-image-icon-512x512-lfoanl0w.png" : `data:image/png;base64,${btoa(new Uint8Array(categoria.imagem?.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;

                            return (
                                <div key={categoria.id} className='CategoryItem' onClick={() => this.setState({categoriaId: categoria.id})}>
                                    <img style={{ width: 56, height: 56 }} src={src} />
                                    <div className='CategoryItemTitle'>{categoria.descricao.toLowerCase().replace(/(?:^|\s)\S/g, (text: any) => text.toUpperCase())}</div>
                                </div>
                            )

                        })}
                    </div>
                </div>
            </div>
        );

    }

    FoodsContainer = (): React.ReactElement => {

        let categorias: any[] = _.cloneDeep(this.state.data.categorias);

        if (this.state.categoriaId != undefined) {
            categorias = _.filter(categorias, (categoria: any) => categoria.id == this.state.categoriaId);
        }

        if (this.state.searchText != "") {
            for (let categoria of categorias) {
                const produtos = _.filter(_.get(categoria, 'produtos'), (product: any) => product.nome.toLowerCase().includes(this.state.searchText.toLowerCase()));
                _.set(categoria, 'produtos', produtos);
            }
        }

        categorias = _.filter(categorias, (categoria: any) => _.size(categoria.produtos) > 0);

        return (
            <div className='FoodsContainer'>
                {_.map(categorias, (categoria: any) => (
                    <div key={categoria.id}>

                        <div className='Title'>{categoria.descricao.toLowerCase().replace(/(?:^|\s)\S/g, (text: any) => text.toUpperCase())}</div>
                        <div className='FoodList'>
                            {_.map(categoria.produtos, (produto: any) => {

                                const src = `https://static-00.iconduck.com/assets.00/no-image-icon-512x512-lfoanl0w.png`;

                                return (
                                    <div key={produto.id} className='Food' onClick={() => this.ProductDetail_Click(produto)}>
                                        <div className='FoodImageContainer'>
                                            <img
                                                style={{ width: 88, height: 88 }}
                                                src={src}
                                            />
                                        </div>
                                        <div className='FoodContent'>
                                            <div className='FoodTitle'><h5 className="itemName mb-0">{produto.nome.toLowerCase().replace(/(?:^|\s)\S/g, (text: any) => text.toUpperCase())}</h5></div>
                                            <div className='FoodDescription'>{produto.descricao}</div>
                                            <div className='FoodPricing'><h5>R$ {produto.valor}</h5></div>
                                        </div>
                                    </div>
                                );

                            })}
                        </div>
                    </div>
                ))}
            </div>
        )
        
    }

    render(): React.ReactNode {

        return (
            <>
            
                <ProductDetail ref={this.ProductDetail} />

                <div className="container-fluid nopadding">
                    <div className="container-fluid nopadding" style={{ backgroundColor: 'rgb(8, 8, 8)', paddingTop: '0px' }}>
                        <div className="row nopadding logo-left" style={{ width: '100%', backgroundImage: 'url(https://instadelivery-public.nyc3.cdn.digitaloceanspaces.com/stores/background/169877355565413a33ddf2c.png)', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', height: '250px' }}>
                            <div className="container">
                                <img src="https://instadelivery-public.nyc3.cdn.digitaloceanspaces.com/stores/logo/17008362176560b3799cb9f_medium.png" height="90" width="90" alt="Logo" className="logo-rounded" />
                            </div>
                        </div>
                    </div>
                    <div className="container pt-2">
                        <div className="card border-0">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p>
                                        <a href="javascript:;" className="mb-2" style={{ color: 'rgb(255, 77, 7)' }}>
                                            <span>
                                                <span className="badge badge-success card-items mr-1 py-1" style={{ backgroundColor: 'rgb(255, 77, 7)' }}>Aberto!</span>
                                                <b>{this.obterDiaSemana(new Date())} - {_.get(this.state.data.empresa, `pedidoDigital.funcionamento.${this.obterDiaSemana(new Date())}.abre`)} - {_.get(this.state.data.empresa, `pedidoDigital.funcionamento.${this.obterDiaSemana(new Date())}.fecha`)}</b>
                                            </span>
                                            <i className="fas fa-search-plus pl-1" style={{ marginLeft: '5px', color: 'rgb(255, 77, 7)' }}></i>
                                        </a>
                                    </p>
                                    <div><button className="btn btn-primary mr-0" style={{ padding: '0px 10px' }}>
                                        Login
                                    </button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-1">
                                    <p className="card-text"><strong data-v-6e837a60="">
                                        Entrega grátis a partir de&nbsp;<span style={{ color: 'rgb(255, 77, 7)' }}>R$&nbsp;40,00</span></strong>
                                    </p>
                                    {/*
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="card-text reviews"><i className="fas fa-star star" style={{ color: 'rgb(255, 77, 7)' }}></i>
                                            (4.8)
                                        </p>
                                    </div>
                                    */}
                                </div>

                                <div className="mt-3" style={{ borderRadius: '10px', backgroundColor: 'rgb(27, 34, 40)' }}>
                                    <p style={{ whiteSpace: 'pre-line', color: 'rgb(255, 255, 255)', padding: '14px' }}>
                                        <p><em>{this.state.data.empresa?.pedidoDigital?.frase}</em></p>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-12 no-padding items-cart">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card border-0">

                                        <div className="image-view">

                                        </div>
                                        <div className="pb-5 mb-5">
                                            <div className="form-group">
                                                
                                                {this.Category()}

                                                <div className="row col-12 pl-0 pr-0 ml-0">
                                                    <div className="Search">
                                                        <input type="text" className="SearchInput" placeholder="Digite para buscar um item" value={this.state.searchText} onChange={(args: any) => this.setState({searchText: args.target.value})} />
                                                        <div className="SearchButton">
                                                            <i className="fa fa-search"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                            {this.FoodsContainer()}

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="nopadding">
                                        <div className="card hidden-sm-down"><h4 className="card-header"><i className="fas fa-shopping-cart mr-1"></i>Carrinho
                                        </h4> <div className="card-body"><div className="row"><div className="col-md-12"><button className="update-button"><i className="fas fa-minus-square"></i></button> <span className="quantity-items quantityAlert">
                                            1x
                                        </span> <button className="update-button"><i className="fas fa-plus-square"></i></button>
                                            X-Tudo

                                            <span className="pull-right text-strong">
                                                R$&nbsp;25,00

                                            </span></div></div></div> <div className="card-footer"> <p><strong>Subtotal do pedido:</strong> <span className="pull-right">
                                                R$&nbsp;25,00
                                            </span></p><div className="text-center"><p className="mt-3 mb-2">Taxa de entrega calculada no próximo passo!</p></div> <div className="text-center"><button type="button" className="btn btn-success" style={{ background: 'rgb(255, 77, 0)', borderColor: 'rgb(255, 77, 0)' }}><span>FINALIZAR </span> <i className="fas fa-arrow-right"></i></button></div></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

    }

}