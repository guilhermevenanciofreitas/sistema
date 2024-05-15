import React from "react";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";
import _ from "lodash";

export class ViewNotaFiscalBase extends React.Component<Readonly<{Title: string}>> {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: "",
        NFe: null,
        protNFe: null,
    }

    public New = async (nfe: any): Promise<any> =>
    {

        this.Limpar();

        this.setState({...nfe});

        return await this.ViewModal.current?.Show();

    }

    public Edit = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("nfe/findOne", {id});
            Loading.Hide();
            this.setState(r?.data);
        }

        return await this.ViewModal.current?.Show();
 
    }

    protected BtnLimpar_Click = async () =>
    {
        try
        {
            this.Limpar();
        }
        catch (err: any)
        {
            await DisplayError.Show(err);
        }
    }

    private ValidarChaveAcesso = (chNFe: string): boolean =>
    {
        // Verifica se a chave tem 44 caracteres
        if (chNFe.length !== 44) {
            return false; // Chave com tamanho incorreto
        }

        // Obtém o dígito verificador
        var digitoVerificador = parseInt(chNFe.charAt(43), 10);

        // Calcula o dígito verificador esperado
        var soma = 0;
        var peso = 2;
        for (var i = 42; i >= 0; i--) {
            soma += parseInt(chNFe.charAt(i), 10) * peso;
            peso = (peso < 9) ? peso + 1 : 2;
        }
        var resto = soma % 11;
        var digitoVerificadorEsperado = (resto === 0 || resto === 1) ? 0 : 11 - resto;

        // Verifica se o dígito verificador informado coincide com o dígito verificador calculado
        return digitoVerificador === digitoVerificadorEsperado;

    }

    protected BtnSalvar_Click = async () =>
    {
        try
        {

            const chNFe = (_.get(this.state, 'protNFe.infProt.chNFe') as any).replaceAll(' ', '');

            if (_.isEmpty(chNFe)) {
                await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: "Informe a chave de acesso!", buttons: [{ Text: "OK" }]});
                return;
            }

            if (!this.ValidarChaveAcesso(chNFe)) {
                await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: "Chave de acesso inválida!", buttons: [{ Text: "OK" }]});
                return;
            }

            let protNFe: any = _.cloneDeep(_.get(this.state, 'protNFe'));

            _.set(protNFe, 'infProt.chNFe', (_.get(protNFe, 'infProt.chNFe') as any).replaceAll(' ', ''));

            const request = {
                id: _.get(this.state, 'id') || null,
                NFe: _.get(this.state, 'NFe') || null,
                protNFe: protNFe,
            }

            Loading.Show();
            let r = await Service.Post("nfe/save", request);
            Loading.Hide();
    
            if (r?.status == 201) {
                await MessageBox.Show({title: "Info", width: 400, type: 'Warning', content: r?.data.message, buttons: [{ Text: "OK" }]});
                return;
            }
    
            await MessageBox.Show({title: "Info", width: 400, type: "Success", content: "Salvo com sucesso!", buttons: [{ Text: "OK" }]});
    
            this.ViewModal.current?.Close(r?.data);

        }
        catch(err: any)
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnXml_Click = async (event: any) =>
    {

        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('file', file);
        
        const response = await Service.Post('nfe/xml', formData, 'multipart/form-data');

        this.setState({...response?.data});

    }

    protected BtnConsultar = async () => {

        if (_.isEmpty(_.get(this.state, 'protNFe.infProt.chNFe'))) {
            await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: "Informe a chave de acesso!", buttons: [{ Text: "OK" }]});
            return;
        }

        Loading.Show();
        const response = await Service.Post('nfe/consult', {chNFe: (_.get(this.state, 'protNFe.infProt.chNFe') as any).replaceAll(' ', '')});
        Loading.Hide();

        this.setState({...response?.data});

    }

    private Limpar = () =>
    {
        this.setState({
            id: '',
            NFe: null,
            protNFe: null,
        });
    }

}