import React, { useState } from 'react';
import { X, QrCode, CreditCard, Building2, CheckCircle2, Copy, ShieldCheck, Download, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (plan: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [method, setMethod] = useState<'pix' | 'cartao' | 'deposito'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Credit Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingCycle, setBillingCycle] = useState<'mensal' | 'anual'>('mensal');

  // Deposito state
  const [comprovanteAttached, setComprovanteAttached] = useState(false);

  if (!isOpen) return null;

  const pixKey = '00020126580014br.gov.bcb.pix0136farcomba.financeiro@bahia.org.br520400005303986540550.005802BR5925FARCOM FEDERACAO BAHIA6008SALVADOR62070503***6304E8A1';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(billingCycle);
        setSuccess(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
              Assinatura Institucional FARCOM-BA
            </div>
            <h3 className="text-lg font-bold">Filiação de Rádio Comunitária</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resumo do Valor */}
        <div className="bg-blue-50/70 border-b border-blue-100 px-6 py-3 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-600 block">Mensalidade da Emissora:</span>
            <span className="text-2xl font-black text-blue-900">
              {billingCycle === 'mensal' ? 'R$ 50,00' : 'R$ 540,00'}
            </span>
            <span className="text-xs text-slate-500 ml-1">
              {billingCycle === 'mensal' ? '/mês' : '/ano (10% desconto)'}
            </span>
          </div>

          <div className="flex bg-white border border-slate-200 rounded p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setBillingCycle('mensal')}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                billingCycle === 'mensal' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mensal (R$ 50)
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('anual')}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                billingCycle === 'anual' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Anual (-10%)
            </button>
          </div>
        </div>

        {/* Seleção do Meio de Pagamento: PIX, CARTÃO, DEPÓSITO */}
        <div className="p-6">
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
            Escolha a Forma de Pagamento:
          </label>
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            <button
              type="button"
              onClick={() => setMethod('pix')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                method === 'pix'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <QrCode className="w-5 h-5 mb-1 text-emerald-600" />
              <span>PIX Instantâneo</span>
              <span className="text-[10px] text-emerald-600 font-normal">Aprovação imediata</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('cartao')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                method === 'cartao'
                  ? 'bg-blue-50 border-blue-500 text-blue-800 ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-5 h-5 mb-1 text-blue-600" />
              <span>Cartão de Crédito</span>
              <span className="text-[10px] text-blue-600 font-normal">Até 12x</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('deposito')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                method === 'deposito'
                  ? 'bg-amber-50 border-amber-500 text-amber-800 ring-2 ring-amber-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-5 h-5 mb-1 text-amber-600" />
              <span>Depósito / TED</span>
              <span className="text-[10px] text-amber-700 font-normal">BB e Caixa</span>
            </button>
          </div>

          {success ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-xl font-bold text-slate-900">Filiação Confirmada!</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Sua emissora agora tem acesso irrestrito a todos os conteúdos de áudio, spots, jingles e assessoria da FARCOM-BA.
              </p>
            </div>
          ) : (
            <div>
              {/* TAB 1: PIX */}
              {method === 'pix' && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                  <div className="flex flex-col items-center justify-center mb-3">
                    <div className="w-40 h-40 bg-white p-2 border border-slate-200 rounded-lg shadow-sm flex items-center justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(pixKey)}`}
                        alt="QR Code PIX FARCOM-BA"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 mt-2">
                      Abra o aplicativo do seu banco e aponte a câmera
                    </span>
                  </div>

                  <div className="relative mb-4">
                    <input
                      type="text"
                      readOnly
                      value={pixKey}
                      className="w-full text-[11px] font-mono bg-white border border-slate-300 rounded px-3 py-2 pr-24 text-slate-700 select-all"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="absolute right-1 top-1 bottom-1 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPix ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmPayment}
                    disabled={isProcessing}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded shadow cursor-pointer transition flex items-center justify-center gap-2"
                  >
                    {isProcessing ? 'Verificando pagamento...' : 'Já Realizei o Pagamento via PIX'}
                  </button>
                </div>
              )}

              {/* TAB 2: CARTÃO DE CRÉDITO */}
              {method === 'cartao' && (
                <form onSubmit={handleConfirmPayment} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Número do Cartão de Crédito
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Nome Impresso no Cartão
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Ex: RAIMUNDO S SILVA"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Validade (MM/AA)
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Código CVV
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded shadow cursor-pointer transition flex items-center justify-center gap-2"
                    >
                      {isProcessing ? 'Processando transação segura...' : `Confirmar Filiação (${billingCycle === 'mensal' ? 'R$ 50,00' : 'R$ 540,00'})`}
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: DEPÓSITO OU TRANSFERÊNCIA */}
              {method === 'deposito' && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 text-xs">
                  <div className="bg-white p-3 rounded border border-slate-200 space-y-1.5">
                    <div className="font-bold text-blue-900 text-sm">Opção 1: Banco do Brasil (001)</div>
                    <div className="text-slate-700"><strong>Agência:</strong> 2964-5 · <strong>Conta Corrente:</strong> 18452-9</div>
                    <div className="text-slate-700"><strong>Favorecido:</strong> FARCOM-BA Federação das Associações</div>
                    <div className="text-slate-700"><strong>CNPJ:</strong> 08.412.395/0001-84</div>
                  </div>

                  <div className="bg-white p-3 rounded border border-slate-200 space-y-1.5">
                    <div className="font-bold text-blue-900 text-sm">Opção 2: Caixa Econômica Federal (104)</div>
                    <div className="text-slate-700"><strong>Agência:</strong> 0062 · <strong>Operação:</strong> 003 · <strong>Conta:</strong> 4210-8</div>
                    <div className="text-slate-700"><strong>Chave PIX CNPJ:</strong> 08.412.395/0001-84</div>
                  </div>

                  <div className="pt-1">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Comprovante de Depósito:
                    </label>
                    <div
                      onClick={() => setComprovanteAttached(true)}
                      className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition ${
                        comprovanteAttached ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'border-slate-300 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {comprovanteAttached ? (
                        <div className="flex items-center justify-center gap-2 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Comprovante_deposito_farcomba.pdf anexado!</span>
                        </div>
                      ) : (
                        <div>Clique para anexar comprovante (PDF, JPG ou PNG)</div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmPayment}
                    disabled={isProcessing}
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded shadow cursor-pointer transition flex items-center justify-center gap-2 mt-2"
                  >
                    {isProcessing ? 'Enviando comprovante...' : 'Confirmar Envio do Comprovante de Depósito'}
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ambiente Seguro Criptografado</span>
            </span>
            <span>Dúvidas? (71) 3241-8900</span>
          </div>
        </div>
      </div>
    </div>
  );
};
