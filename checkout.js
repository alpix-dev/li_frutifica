Object.keys || (Object.keys = function(a) {
    if (a !== Object(a)) throw new TypeError("Object.keys called on a non-object");
    var b = [],
        c;
    for (c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
    return b
});
var pagar_entrega_tipos = [{
        id: 1,
        value: "dinheiro",
        label: "Dinheiro"
    }, {
        id: 2,
        value: "cheque",
        label: "Cheque"
    }, {
        id: 3,
        value: "cartao_debito_mastercard",
        label: "Cart\u00e3o de d\u00e9bito MasterCard"
    }, {
        id: 4,
        value: "cartao_debito_visa",
        label: "Cart\u00e3o de d\u00e9bito Visa"
    }, {
        id: 5,
        value: "cartao_debito_elo",
        label: "Cart\u00e3o de d\u00e9bito Elo"
    }, {
        id: 6,
        value: "cartao_debito_cabal",
        label: "Cart\u00e3o de d\u00e9bito Cabal"
    }, {
        id: 7,
        value: "cartao_credito_mastercard",
        label: "Cart\u00e3o de cr\u00e9dito MasterCard"
    }, {
        id: 8,
        value: "cartao_credito_visa",
        label: "Cart\u00e3o de cr\u00e9dito Visa"
    }, {
        id: 9,
        value: "cartao_credito_elo",
        label: "Cart\u00e3o de cr\u00e9dito Elo"
    }, {
        id: 10,
        value: "cartao_credito_cabal",
        label: "Cart\u00e3o de cr\u00e9dito Cabal"
    }, {
        id: 11,
        value: "cartao_credito_hipercard",
        label: "Cart\u00e3o de cr\u00e9dito Hipercard"
    }, {
        id: 12,
        value: "cartao_credito_diners",
        label: "Cart\u00e3o de cr\u00e9dito Diners"
    }, {
        id: 13,
        value: "cartao_credito_americanexpress",
        label: "Cart\u00e3o de cr\u00e9dito American Express"
    }, {
        id: 14,
        value: "cartao_sodexo_refeicao",
        label: "Cart\u00e3o Sodexo Refei\u00e7\u00e3o"
    }, {
        id: 15,
        value: "cartao_sodexo_alimentacao",
        label: "Cart\u00e3o Sodexo Alimenta\u00e7\u00e3o"
    }, {
        id: 16,
        value: "cartao_alelo_refeicao",
        label: "Cart\u00e3o Alelo Refei\u00e7\u00e3o"
    }, {
        id: 17,
        value: "cartao_alelo_alimentacao",
        label: "Cart\u00e3o Alelo Alimenta\u00e7\u00e3o"
    }, {
        id: 18,
        value: "cartao_ticket_restaurante",
        label: "Cart\u00e3o Ticket Restaurante"
    }],
    campos_endereco = "#id_endereco #id_numero #id_complemento #id_referencia #id_nome #id_cidade #id_bairro #id_pais_id #id_cidade #id_estado".split(" ");

function hideEndereco() {
    for (var a in campos_endereco) $(campos_endereco[a]).parent().parent().fadeOut();
    $(".formEndereco-conteiner > hr").fadeOut()
}

function showEndereco() {
    for (var a in campos_endereco) $(campos_endereco[a]).parent().parent().fadeIn();
    $(".formEndereco-conteiner > hr").fadeIn()
}

function selecionarEnvioUnico() {
    $("#formas-envio-wrapper.accordion").each(function() {
        1 === $(this).find(".accordion-group").length && $(this).find(".accordion-group label").click()
    })
}

function preencheCampoEndereco(a, b) {
    "id_cep" === b.attr("id") ? (b = $("#id_endereco"), a.logradouro ? (address = a.logradouro, b.val(address).attr("readonly", "readonly").blur(), b.data("autocompleted", !0)) : (b.data("autocompleted") && (b.val(""), b.data("autocompleted", !1)), b.removeAttr("readonly")), b = $("#id_bairro"), a.bairro ? (b.val(a.bairro).attr("readonly", "readonly").blur(), b.data("autocompleted", !0)) : (b.data("autocompleted") && (b.val(""), b.data("autocompleted", !1)), b.removeAttr("readonly")), b = $("#id_cidade"),
        a.cidade ? (b.val(a.cidade).attr("readonly", "readonly").blur(), b.data("autocompleted", !0)) : (b.data("autocompleted") && (b.val(""), b.data("autocompleted", !1)), b.removeAttr("readonly")), b = $("#id_estado"), a.estado ? (b.find('option[value="' + a.estado + '"]').prop("selected", !0), b.attr("readonly", "readonly").blur(), b.data("autocompleted", !0)) : (b.data("autocompleted") && b.data("autocompleted", !1), b.removeAttr("readonly"))) : (a.logradouro ? (address = a.logradouro, b.parents(".pagamento_selecao_info").find(".cartao_endereco_rua").val(address)) :
        b.parents(".pagamento_selecao_info").find(".cartao_endereco_rua").val(""), a.bairro ? b.parents(".pagamento_selecao_info").find(".cartao_endereco_bairro").val(a.bairro) : b.parents(".pagamento_selecao_info").find(".cartao_endereco_bairro").val(""), a.cidade ? b.parents(".pagamento_selecao_info").find(".cartao_endereco_cidade").val(a.cidade) : b.parents(".pagamento_selecao_info").find(".cartao_endereco_cidade").val(""), a.estado && b.parents(".pagamento_selecao_info").find('.cartao_endereco_estado option[value="' +
            a.estado + '"]').prop("selected", !0))
}

function calcularFrete(a, b) {
    var c = {
        data: {
            cep: a
        },
        dataType: "json",
        type: "get",
        success: function(e) {
            preencheCampoEndereco(e, b)
        },
        error: function() {
            preencheCampoEndereco({}, b)
        },
        ttl: 3600
    };
    endpoint_api = "//api.awsli.com.br/v2/cep";
    $.ajax(endpoint_api, c);
    "id_cep" === b.attr("id") && ($.cookie("cep", a, {
        expires: 7,
        path: "/"
    }), atualizarEnvio())
}

function getCepBlur(a) {
    a = $(this).val().replace(/[^0-9]+/g, "");
    for (var b = $(this), c = "", e = 0; e < a.length; ++e) {
        var g = a.charAt(e);
        ("0" > g || "9" < g) && "" !== g || (c += g)
    }
    c && calcularFrete(a, b)
}

function getCep(a) {
    a = $(this).val().replace(/[^0-9]+/g, "");
    for (var b = $(this), c = "", e = 0; e < a.length; ++e) {
        var g = a.charAt(e);
        ("0" > g || "9" < g) && "" !== g || (c += g)
    }
    8 <= c.length && calcularFrete(a, b)
}
var frete_gratis = !1;
"Frete gr\u00e1tis" == $("[data-cupom-codigo]").text() && (frete_gratis = !0);

function aplicarCupom() {
    var a = $("#inputCupom").val(),
        b = 0;
    if (!a) return 0;
    $.getJSON("/carrinho/cupom/validar.json", {
        cupom: a
    }, function(c) {
        if (c.error) return $("#inputCupom").val(""), $("#alertError span").html(c.error), $("#alertError").show(), 0 < $("#inputCupom").length && $.get("/carrinho/cupom/remover", {
            cupom: a
        }, function() {
            alert(c.error + " Seu cupom ser\u00e1 removido, para adicion\u00e1-lo novamente, v\u00e1 para o carrinho.");
            document.location.reload(!0)
        }), !1;
        $("#alertError").hide();
        $("#inputCupom").attr("readonly",
            "readonly");
        if ("fixo" == c.type || "porcentagem" == c.type) b = c.value, $("#cupomResultado").parent().parent().prev().find(".hide").show(), c.applyToTotal || "frete_gratis" == c.type ? $("#cupomResultado").html('<strong class="titulo cor-principal">R$ ' + formatar_decimal_br(c.discountValue) + "</strong>") : $("#cupomResultado").html('<strong class="titulo cor-principal">R$ ' + formatar_decimal_br(c.discountValue) + '</strong><small class="muted">(frete n\u00e3o incluso)</small>');
        "frete_gratis" == c.type && (frete_gratis = !0,
            $("#cupomResultado").html("<strong>Frete gr\u00e1tis</strong>"));
        $("#cupomResultado").attr("data-cupom-desconto", b);
        $("#cupomResultado").trigger("carrinho.desconto.valor_alterado")
    })
}

function carregarFormasEnvioCheckout(a, b) {
    $(".formEndereco-conteiner:eq(0)").is(":visible") ? $(".formEndereco-conteiner:eq(0)").addClass("spinner") : $("#formularioEndereco").addClass("loading");
    $.getJSON("/checkout/frete", {
        cep: a
    }, function(c) {
        if (Object.keys(c).length) $(".envio-erro").hide();
        else {
            $(".envio-preco").html("");
            $(".envio-prazo-entrega").html("");
            $(".forma-envio").removeClass("active");
            $(".forma-envio input[type=radio]").removeAttr("checked");
            var e = $("#id_cep").val();
            0 >= e.length && ($(".envio-erro").html("CEP n\u00e3o informado."),
                $(".envio-erro").show())
        }
        c && 0 < c.length ? ($("#formasEnvio").show(), $(".forma-envio").hide(), $(".forma-envio").addClass("indisponivel"), $("#formas-envio-wrapper").html(""), $.each(c, function(k, d) {
                k = "";
                valor = d.price;
                valor = frete_gratis && "frete_gratis" == c.code ? "0,00" : formatar_decimal_br(valor);
                0 < d.deliveryTime && (k = 1 == d.deliveryTime ? d.deliveryTime + " dia" : d.deliveryTime + " dias");
                "Retirar pessoalmente" === d.name ? d.name = "Retirada" : "mercadoenvios_api" == d.type && (d.name = d.name.replace("MercadoEnvios ", ""));
                div =
                    '<div class="accordion-group :code forma-envio hide" id="envio:id-:code" data-id=":id" data-nome=":name" data-code=":code"><label for="formaEnvio:id-:code" class="accordion-heading :name"><span class="radio-conteiner"><input type="radio" name="forma_envio" value=":id" id="formaEnvio:id-:code" ';
                d.id == ENVIO_ESCOLHIDO && d.code == ENVIO_ESCOLHIDO_CODE && (div += 'checked="checked" ');
                div += 'data-codigo=":code" data-preco=":price" /></span><span class="forma-conteiner"><span class="helper"></span><div class="text-content"><span class="cor-secundaria"><span class="cor-principal envio-preco"></span><b class="envio-prazo-entrega"></b></span></div><span class="envio-nome cor-secundaria" id="envio-nome-:id">';
                div += d.name;
                div += "</span></span></label></div>";
                div = div.replace(/:id/g, d.id).replace(/:code/g, d.code).replace(/:name/g, d.name).replace(/:img/g, d.image).replace(/:price/g, d.price);
                $("#formas-envio-wrapper").append(div);
                $(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "]").show();
                $(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "]").removeClass("indisponivel");
                $(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "]").find(".envio-nome").html(d.name);
                $(".forma-envio[data-id=" + d.id + "][data-code=" +
                    d.code + "]").find(".envio-preco").html("R$ " + valor);
                $(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "]").attr("data-valor", d.price);
                $(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "]").find(".envio-prazo-entrega").html(k);
                $(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "] input[name=forma_envio]").attr("data-prazo", d.deliveryTime);
                d.msgErro ? ($(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "] .forma-aviso").length || $(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "]").append('<div class="forma-aviso hide" />'),
                    $(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "] .forma-aviso").text(d.msgErro)) : $(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "] .forma-aviso").remove();
                "frete_gratis" == d.name ? ($(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "]").find("img").hide(), $(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "]").find(".title").show()) : ($(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "]").find("img").show(), $(".forma-envio[data-id=" + d.id + "][data-code=" + d.code + "]").find(".title").hide())
            })) :
            ($("#formasEnvio").hide(), b ? ($(".envio-erro").html('<i class="icon-info-sign"></i> N\u00e3o foram encontradas formas de envio.'), $(".envio-erro").show()) : setTimeout(function() {
                carregarFormasEnvioCheckout(e, !0)
            }, 500));
        $("#exibirFormasEnvio a").click();
        selecionarEnvioUnico();
        var g = ENVIO_ESCOLHIDO,
            h = ENVIO_ESCOLHIDO_CODE;
        if (g && h && 0 === countCepChanges) {
            if ($(".resumo-compra .tabela-carrinho .frete-preco .titulo").length) {
                var f = $("[name=forma_envio]:checked");
                $(".resumo-compra .tabela-carrinho .frete-preco .titulo").text($(f).parents(".forma-envio").find(".envio-preco").text());
                $(".resumo-compra .tabela-carrinho .frete-preco small").hide();
                $(".resumo-compra .tabela-carrinho .frete-preco .titulo").show()
            }
            calcularTotal();
            $("#envio" + g + "-" + h).find("label").click();
            770 < window.innerWidth && $(".tabela-carrinho .tr-checkout-frete, .tabela-carrinho .tr-checkout-total").slideDown();
            countCepChanges++
        }
    }).fail(function() {
        b ? ($(".envio-erro").html("N\u00e3o foi poss\u00edvel carregar as formas de envio. Tente novamente."), $(".envio-erro").show(), $("#formasEnvio").hide()) : setTimeout(function() {
            carregarFormasEnvioCheckout(a,
                !0)
        }, 500)
    }).always(function() {
        $(".formEndereco-conteiner:eq(0)").removeClass("spinner");
        $("#formularioEndereco").removeClass("loading")
    })
}
var countCepChanges = 0;

function atualizarEnvio() {
    var a = $("#id_cep").val();
    a &&= a.replace(/[^0-9]+/g, "");
    if ($("#id_cep").data("ultimo-cep") == a) return !1;
    $("#id_cep").data("ultimo-cep", a);
    var b = $(".input-cep:first").val();
    b && !a && ($("#id_cep").val(b), a = b);
    if (!a.length) return !1;
    carregarFormasEnvioCheckout(a, !1)
}

function atualizarEndereco() {
    var a = $("input.endereco-principal:checked");
    a.parents(".accordion-heading.collapsed").click();
    a = a.val();
    var b = "/checkout/endereco/detalhar/" + a;
    $("#formularioEndereco").addClass("loading");
    $("#formasEnvio ul").empty().removeClass("hide").addClass("loading").slideDown();
    $.getJSON(b, function(c) {
        $.each(c, function(e, g) {
            "nome" != e && $("#id_" + e).val(g)
        });
        $("#formasEnvio ul").removeClass("loading");
        $("#formularioEndereco").removeClass("loading");
        atualizarEnvio()
    });
    "0" == a ? ($("#formularioEndereco .formEndereco-conteiner").find("input").not("#id_cep").val(""),
        a = $("#formularioEndereco .formEndereco-conteiner").find("input#id_cep"), a.val() && (0 > a.val().indexOf("-") || a.val().replace("-", "") !== $.cookie("cep")) && a.val(""), $("#formularioEndereco .formEndereco-conteiner").find("#id_nome").val($("#carrinho-cliente-nome").data("nome")), $("#formularioEndereco .formEndereco-conteiner").slideDown(), $("#formularioEndereco #exibirFormasEnvio").stop().animate({
            marginTop: "25px",
            marginBottom: "15px"
        }, 400), $(".cep-modal").show(), $("#id_cep:first-child").focus()) : ($(".cep-modal").hide(),
        $("#formularioEndereco .formEndereco-conteiner").slideUp(), $("#formularioEndereco #exibirFormasEnvio").stop().animate({
            marginTop: "0",
            marginBottom: "15px"
        }, 400))
}

function debounceFuncCall(a, b, c) {
    var e;
    return function() {
        var g = this,
            h = arguments;
        clearTimeout(e);
        e = setTimeout(function() {
            e = null;
            c || a.apply(g, h)
        }, b);
        c && !e && a.apply(g, h)
    }
}
var requestValor, requestValorDataOld, calcularTotal = debounceFuncCall(function() {
        var a = $("#cupomResultado").attr("data-cupom-codigo");
        var b = parseFloat($(".tabela-carrinho .subtotal").attr("data-float") || 0);
        forma_pagamento_id = $("[name=forma_pagamento]:checked").val() || null;
        parseFloat($("#formasEnvio input[name=forma_envio]:checked").parents(".forma-envio").attr("data-valor"));
        envio_id = $("[name=forma_envio]:checked").val() || null;
        envio_code = $("[name=forma_envio]:checked").data("codigo");
        requestValorData = {
            envio_id,
            envio_code,
            valor_subtotal: b,
            cupom: a,
            forma_pagamento_id
        };
        JSON.stringify(requestValorDataOld) !== JSON.stringify(requestValorData) && (requestValorDataOld = jQuery.extend(!0, {}, requestValorData), $(".preco-carrinho-total, .aguardar-valor").addClass("valor-loading"), $(".preco-carrinho-total").trigger("calcular_total_iniciado"), ativarBotaoCompra("disable"), $("#finalizarCompra").attr("disabled", !0), requestCalcularTotal(requestValorData))
    }, 100),
    requestCalcularTotal = debounceFuncCall(function(a) {
            requestValor &&
                (requestValor.abort(), requestValor = null);
            requestValor = $.getJSON("/carrinho/valor/", a, function(b) {
                alteraValorTotal(b.total);
                paymentMinimumValue(b);
                $(".valor-desconto-forma-pagamento").data("float", b.desconto_forma_pagamento);
                aplicarCupom();
                if (payment_system_card)
                    if (b.cards && (payment_system_card = b.cards), $("#pagamentoCartao #radio-cartao").val()) {
                        var c = $("#pagamentoCartao #radio-cartao").val(),
                            e = $.grep(payment_system_card, function(g, h) {
                                return g.id == c
                            });
                        e && e.length && (new exibirParcelas("#escolha-cartao #cartao_cartao_parcelas")).preencheParcelas(e[0].installments)
                    } else $("#escolha-cartao #bandeiras-manual").is(":visible") ?
                        $("#escolha-cartao #cartao_cartao_parcelas").html('<option value="">Selecione uma bandeira</option>') : $("#escolha-cartao #cartao_cartao_parcelas").html('<option value="">Digite o n\u00famero do cart\u00e3o</option>');
                0 < b.desconto_forma_pagamento ? ($(".tabela-carrinho .desconto-tr .desconto-preco .titulo").html("R$ " + formatar_decimal_br(b.desconto_forma_pagamento)), $(".tabela-carrinho .desconto-tr").slideDown(), $(".tabela-carrinho .tr-checkout-total").slideDown()) : ($(".tabela-carrinho .desconto-tr").slideUp(),
                    $(".tabela-carrinho .desconto-tr .desconto-preco .titulo").html("R$ " + formatar_decimal_br(0)));
                $("#cart_selected_shipping").val(b.envio_selecionado);
                $("#cart_selected_payment").val(b.pagamento_selecionado);
                b.envio_selecionado != a.envio_id && ($("#exibirFormasEnvio a").click(), erroTenteNovamente("N\u00e3o foi poss\u00edvel selecionar forma de envio.<br />Tente novamente ou utilize outra op\u00e7\u00e3o. (ERRTT01)"));
                b.pagamento_selecionado != a.forma_pagamento_id && ($("#exibirFormasPagamento a").click(),
                    erroTenteNovamente("N\u00e3o foi poss\u00edvel selecionar forma de pagamento.<br />Tente novamente ou utilize outra op\u00e7\u00e3o. (ERRTT02)"));
                $(".preco-carrinho-total").trigger("valor_total_alterado", b)
            }).done(function() {
                ativarBotaoCompra();
                $("#finalizarCompra").attr("disabled", !1)
            }).fail(function(b) {}).always(function(b) {
                requestValor = null;
                "abort" != b.statusText && ($(".preco-carrinho-total, .aguardar-valor").removeClass("valor-loading"), $(".preco-carrinho-total").trigger("calcular_total_concluido"))
            })
        },
        1E3);

function ativarBotaoCompra(a) {
    "disable" !== a && $("#formasEnvio .forma-envio input:checked").length && $("#formasPagamento .accordion-heading input:checked").length ? ($("#finalizarCompra").attr("readonly", !1), $("#finalizarCompra").button("reset")) : ($("#finalizarCompra").attr("readonly", !0), $("#finalizarCompra").addClass("disabled"));
    $("#finalizarCompra").removeClass("is_loading")
}

function alteraValorTotal(a, b) {
    $(".preco-carrinho-total").html("R$ " + formatar_decimal_br(a));
    $(".preco-carrinho-total").data("float", a);
    b || ($(".resumo-compra .total").data("total", a), $(".preco-carrinho-total").trigger("carrinho.valor_alterado"))
}

function paymentMinimumValue(a) {
    pci_total_old = pci_total;
    pci_total = a.pci_total;
    $.each(payment_systems, function(b, c) {
        b = "creditCard" == c.groupName ? "cc" : c.code + "-" + c.id;
        0 == c.minimumValue || pci_total >= c.minimumValue ? $(".li-box-payment-" + b).slideDown() : ($(".li-box-payment-" + b).find('input[name="forma_pagamento"]').is(":checked") && $("#exibirFormasPagamento a").click(), $(".li-box-payment-" + b).slideUp())
    });
    pci_total >= a.minimum_value.value ? ($("#li-box-payment-minimum-value").slideUp(), $("#continueShopping").slideUp(),
        $("#finalizarCompra").slideDown(), 0 == $('input[name="forma_pagamento"]:checked').length && pci_total_old != pci_total && selecionar_pagamento_padrao()) : ($(".li-box-payment-minimum-value-left").text("R$" + formatar_decimal_br(a.minimum_value.value - pci_total)), $("#li-box-payment-minimum-value").slideDown(), $("#continueShopping").slideDown(), $("#finalizarCompra").slideUp())
}

function alertToModal() {
    $(".alert-geral").length && $(".alert-geral").is(":visible") && $.mostraAlerta({
        type: $(".alert-geral").data("type"),
        message: '<span style="margin-top: 10px; font-size: 14px; line-height: 20px;">' + $(".alert-geral").find("*").remove().end().text() + "</span>",
        closeOthers: !0
    })
}

function cardPlaceholder() {
    placeholder_card = {};
    $(".placeholder-card").each(function() {
        var a = $(this).data("code");
        placeholder_card[a] = new Card({
            form: "#escolha-" + a,
            container: "." + a + "-placeholder-card",
            formSelectors: {
                numberInput: "." + a + "_cartao_numero",
                expiryInput: "." + a + "_cartao_data_expiracao",
                cvcInput: "." + a + "_cartao_cvv",
                nameInput: "." + a + "_cartao_nome"
            },
            messages: {
                monthYear: "mm/aa"
            },
            placeholders: {
                name: "Nome Completo"
            }
        })
    })
}

function possuiCampoVazio() {
    var a = !1;
    $("#formRecaptcha #g-recaptcha-response").length && !$("#formRecaptcha #g-recaptcha-response").val() && (a = !0, "undefined" !== typeof grecaptcha && grecaptcha.reset());
    $("#userExtraInfo").length && ($("#formularioCheckout .dados-cadastro .control-group.required .controls input").each(function() {
        if ("PJ" == $("#id_tipo").val()) {
            if ("cpf" == $(this).attr("name") || "data_nascimento" == $(this).attr("name")) return
        } else if ("cnpj" == $(this).attr("name") || "razao_social" == $(this).attr("name")) return;
        "" === this.value && (a = !0, $(this).focus());
        $(this).parents(".control-group.required.error:visible").length && (a = !0, $(this).focus())
    }), "" === $("#formularioCheckout .dados-cadastro .control-group.required #id_sexo").val() && "PJ" !== $("#id_tipo").val() && (a = !0, $("#formularioCheckout .dados-cadastro .control-group.required #id_sexo").parent().parent().addClass("erro error")));
    $("#formularioEndereco #userNewAddressInfo:visible").length && $("#formularioEndereco #userNewAddressInfo .control-group.required .controls input").each(function() {
        "" ===
        this.value && (a = !0, $(this).focus());
        $(this).parents(".control-group.required.error:visible").length && (a = !0, $(this).focus())
    });
    "" === $("#formularioCheckout #formularioObservacao.required textarea").val() && (a = !0, $("#formularioCheckout #formularioObservacao.required textarea").focus().parent().addClass("erro error"));
    $("#id_politica_privacidade").length && !$("#id_politica_privacidade").is(":checked") && ($("#formularioCheckout #id_politica_privacidade").change(), a = !0);
    return a
}

function validateExpiryDate(a) {
    var b = (new Date).getFullYear() - 2E3;
    return 4 !== a.replace(/\D/g, "").length || 2 !== a.indexOf("/") || 12 < a.substring(0, 2) || a.substring(3, 5) < b || a.substring(3, 5) > b + 20 ? !1 : !0
}

function maskExpiryDate() {
    var a = $(this),
        b = a.val();
    2 === b.length && setTimeout(function() {
        2 !== b.indexOf("/") && a.val(b + "/")
    }, 300)
}

function coletarDadosPagamento() {
    var a = !0,
        b = $("#formasPagamento input[name=forma_pagamento]:checked").parents(".pagamento_selecao_conteiner"),
        c = b.find(".cartao_dados_numero"),
        e = b.find(".cartao_dados_expiracao"),
        g = b.find(".cartao_dados_nome"),
        h = b.find(".cartao_dados_cvv"),
        f = b.find(".cartao_dados_parcelas"),
        k = b.find(".cartao_dados_titular_check"),
        d = b.find(".cartao_endereco_check");
    !c.val() || 13 > c.val().replace(/\D/g, "").length ? (c.parents(".control-group").addClass("erro error"), a = !1) : (c.parents(".control-group").removeClass("erro error"),
        token_data[0].cardNumber = c.val().replace(/\D/g, ""));
    e.val() && validateExpiryDate(e.val()) ? (e.parents(".control-group").removeClass("erro error"), token_data[0].expiryDate = e.val()) : (e.parents(".control-group").addClass("erro error"), a = !1);
    !g.val() || 0 > g.val().trim().indexOf(" ") ? (g.parents(".control-group").addClass("erro error"), a = !1) : (g.parents(".control-group").removeClass("erro error"), token_data[0].cardHolder = g.val(), $("#payment_client_name").val(token_data[0].cardHolder));
    !h.val() || 3 > h.val().replace(/\D/g,
        "").length ? (h.parents(".control-group").addClass("erro error"), a = !1) : (h.parents(".control-group").removeClass("erro error"), token_data[0].csc = h.val());
    f.val() ? (f.parents(".control-group").removeClass("erro error"), $("#payment_installments").val(f.val())) : (f.parents(".control-group").addClass("erro error"), a = !1);
    if (k.is(":checked")) {
        c = b.find(".cartao_dados_cpf");
        e = b.find(".cartao_dados_nascimento");
        g = b.find(".cartao_dados_telefone");
        (h = c.val().replace(/\.|-/gi, "")) && validateCPF(h) ? (c.parents(".control-group").removeClass("erro error"),
            token_data[0].document = c.val().replace(/\D/g, ""), token_data[0].documentType = "CPF") : (c.parents(".control-group").addClass("erro error"), a = !1);
        if (e.val()) try {
            $.datepicker.parseDate("dd/mm/yy", e.val()), e.parents(".control-group").removeClass("erro error")
        } catch (l) {
            e.parents(".control-group").addClass("erro error"), a = !1
        } else e.parents(".control-group").addClass("erro error"), a = !1;
        g.val() ? g.parents(".control-group").removeClass("erro error") : (g.parents(".control-group").addClass("erro error"), a = !1);
        user_data.dados_cobranca = !0;
        $("#payment_client_document").val(token_data[0].document);
        $("#payment_client_birthday").val(e.val());
        $("#payment_client_phone").val(g.val())
    } else user_data.dados_cobranca = !1, $("#payment_client_document").val(""), $("#payment_client_birthday").val(""), $("#payment_client_phone").val("");
    d.is(":checked") ? (d = b.find(".cartao_endereco_cep"), c = b.find(".cartao_endereco_rua"), e = b.find(".cartao_endereco_numero"), g = b.find(".cartao_endereco_compl"), h = b.find(".cartao_endereco_bairro"), f = b.find(".cartao_endereco_cidade"),
            k = b.find(".cartao_endereco_estado"), !d.val() || 8 > d.val().replace(/\D/g, "").length ? (d.parents(".control-group").addClass("erro error"), a = !1) : (d.parents(".control-group").removeClass("erro error"), token_data[0].address.postalCode = d.val()), c.val() ? (c.parents(".control-group").removeClass("erro error"), token_data[0].address.street = c.val()) : (c.parents(".control-group").addClass("erro error"), a = !1), e.val() ? (e.parents(".control-group").removeClass("erro error"), token_data[0].address.number = e.val()) : (e.parents(".control-group").addClass("erro error"),
                a = !1), g.val() && (token_data[0].address.complement = g.val()), h.val() ? (h.parents(".control-group").removeClass("erro error"), token_data[0].address.neighborhood = h.val()) : (h.parents(".control-group").addClass("erro error"), a = !1), f.val() ? (f.parents(".control-group").removeClass("erro error"), token_data[0].address.city = f.val()) : (f.parents(".control-group").addClass("erro error"), a = !1), k.val() ? (k.parents(".control-group").removeClass("erro error"), token_data[0].address.state = k.val()) : (k.parents(".control-group").addClass("erro error"),
                a = !1), user_data.endereco_cobranca = !0, $("#payment_address_postalCode").val(token_data[0].address.postalCode), $("#payment_address_street").val(token_data[0].address.street), $("#payment_address_number").val(token_data[0].address.number), $("#payment_address_complement").val(token_data[0].address.complement), $("#payment_address_neighborhood").val(token_data[0].address.neighborhood), $("#payment_address_city").val(token_data[0].address.city), $("#payment_address_state").val(token_data[0].address.state)) :
        (user_data.endereco_cobranca = !1, $("#payment_address_postalCode").val(""), $("#payment_address_street").val(""), $("#payment_address_number").val(""), $("#payment_address_complement").val(""), $("#payment_address_neighborhood").val(""), $("#payment_address_city").val(""), $("#payment_address_state").val(""));
    token_data[0].paymentSystem = b.find("[name=forma_pagamento]").data("nome-gateway");
    $("#payment_address_active").val(user_data.endereco_cobranca);
    $("#payment_client_active").val(user_data.dados_cobranca);
    return a
}
var resize = function() {
    var a = $("#formas-pagamento-wrapper");
    if (0 == a.find(".placeholder-card").length) return !1;
    a = a.width();
    var b = 1;
    390 > a && (b = a / 390);
    $(".jp-card-container").each(function() {
        $(this).css("transform", "scale(" + b + ")");
        100 > $(this)[0].getBoundingClientRect().height ? $(this).parent(".placeholder-card").height(148) : $(this).parent(".placeholder-card").height($(this)[0].getBoundingClientRect().height);
        $(this).parent(".placeholder-card").width($(this)[0].getBoundingClientRect().width)
    })
};

function selecionar_pagamento_padrao() {
    $("#formasPagamento.accordion, #formas-envio-wrapper.accordion").each(function() {
        1 === $(this).find(".accordion-group").length && $(this).find(".accordion-group .accordion-heading input").click()
    });
    if ($(".formas.pagamento .forma-pagamento-padrao").length) {
        var a = $(".formas.pagamento .forma-pagamento-padrao[value=cartao]").length ? $(".formas.pagamento .forma-pagamento-padrao[value=cartao]").first().val() : $(".formas.pagamento .forma-pagamento-padrao").first().val();
        $("input[name=forma_pagamento]").each(function() {
            if ($(this).data("code") === a && "none" != $(this).parents(".li-box-payment").css("display") && $(this).parents(".li-box-payment").data("minimum-value") <= pci_total) return $(this).click(), !1
        })
    }
}

function atualizarDadosCliente() {
    var a = $("#id_endereco").val();
    token_data[0].address.street && token_data[0].address.street == a || !a || (token_data[0].address.street = a);
    a = $("#id_numero").val();
    token_data[0].address.number && token_data[0].address.number == a || !a || (token_data[0].address.number = a);
    a = $("#id_complemento").val();
    token_data[0].address.complement && token_data[0].address.complement == a || (token_data[0].address.complement = a);
    a = $("#id_bairro").val();
    token_data[0].address.neighborhood && token_data[0].address.neighborhood ==
        a || !a || (token_data[0].address.neighborhood = a);
    a = $("#id_cidade").val();
    token_data[0].address.city && token_data[0].address.city == a || !a || (token_data[0].address.city = a);
    a = $("#id_estado").val();
    token_data[0].address.state && token_data[0].address.state == a || !a || (token_data[0].address.state = a);
    a = $("#id_cep").val();
    token_data[0].address.postalCode && token_data[0].address.postalCode == a || !a || (token_data[0].address.postalCode = a);
    "PJ" == $("#id_tipo_usuario").val() ? (token_data[0].documentType = "CNPJ", a = $("#id_cnpj").val()) :
        (token_data[0].documentType = "CPF", a = $("#id_cpf").val());
    token_data[0].document && token_data[0].document == a || (a ? token_data[0].document = a : (token_data[0].document = user_data.documento, token_data[0].documentType = user_data.documentoTipo))
}

function setPurchaseCookie(a) {
    $.cookie(a, (new Date).toString(), {
        expires: 1
    })
}

function deveBloquearCompraRepetida() {
    for (var a = [], b = 0; b < cart_items.length; b++) {
        var c = a,
            e = cart_items[b];
        c.push.call(c, e.id.toString() + "|" + e.quantity.toString())
    }
    c = {};
    e = $("#formularioCheckout").serializeArray();
    for (b = 0; b < e.length; b++) c[e[b].name] = e[b].value;
    delete c.payment_cvv;
    c.cartao_cartao_numero && (c.cartao_cartao_numero = c.cartao_cartao_numero.slice(-4));
    b = Sha256.hash(JSON.stringify(c));
    a = "checkout-" + client_id + "-" + a.join("-") + "-" + b;
    b = $.cookie(a);
    if (!b) return setPurchaseCookie(a), !1;
    if (Math.floor((new Date -
            new Date(b)) / 1E3 / 60) < SAME_PURCHASE_COOLDOWN) return !0;
    setPurchaseCookie(a);
    return !1
}

function validarCheckout(a) {
    $("#cart_selected_shipping_value").val($("#formasEnvio input[name=forma_envio]:checked").data("preco"));
    var b = $("#formasPagamento input[name=forma_pagamento]:checked");
    b.length && -1 < b.attr("id").indexOf("radio-bank-") ? $("#payment_bank_id").val(b.data("bank-id")) : $("#payment_bank_id").val("");
    if ($("#formasEnvio input[name=forma_envio]:checked").length && $("#formasEnvio input[name=forma_envio]:checked").val() === $("#cart_selected_shipping").val())
        if (b.length && b.val() === $("#cart_selected_payment").val()) {
            if (possuiCampoVazio()) return $.fancybox({
                type: "inline",
                content: '<h5 style="line-height: 30px; white-space: nowrap; text-align: center;">Preencha todos os campos obrigat\u00f3rios corretamente.<br />Caso o erro persista, recarregue a p\u00e1gina e tente novamente.</h5>'
            }), !1;
            if ("radio-cartao" === b.attr("id") && !coletarDadosPagamento()) return $.fancybox({
                type: "inline",
                content: '<h5 style="line-height: 70px; white-space: nowrap;">Preencha os dados de pagamento corretamente</h5>'
            }), !1;
            if (a && deveBloquearCompraRepetida()) return $.fancybox({
                type: "inline",
                content: '<h5 style="line-height: 30px; white-space: nowrap;">Voc\u00ea tentou fazer uma compra igual a esta nos \u00faltimos minutos.<br />Para evitar duplicar o seu pedido, confira se ele j\u00e1 foi emitido na tela de pedidos e, caso contr\u00e1rio, tente novamente em ' +
                    SAME_PURCHASE_COOLDOWN + " minutos</h5>"
            }), !1
        } else return $.fancybox({
            type: "inline",
            content: '<h5 style="line-height: 70px; white-space: nowrap;">Selecione uma forma de pagamento</h5>'
        }), b.length && $("#exibirFormasPagamento a").click(), !1;
    else return $.fancybox({
        type: "inline",
        content: '<h5 style="line-height: 70px; white-space: nowrap;">Selecione uma forma de envio</h5>'
    }), $("#formasEnvio input[name=forma_envio]:checked").length && $("#exibirFormasEnvio a").click(), !1;
    return !0
}

function erroTenteNovamente(a) {
    a ||= "Falha ao realizar pedido. Tente novamente.";
    window.stop();
    ativarBotaoCompra();
    $.fancybox({
        type: "inline",
        content: '<div style="display: flex;align-items: center;min-height: 100%;text-align: center;"><h5>' + a + "</h5></div>"
    })
}
var ajaxRequestSession;

function requestSession() {
    ajaxRequestSession = $.ajax({
        url: api_payment_url + "payments/_session?an=" + store_identifier,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        dataType: "json",
        data: JSON.stringify({
            account: store_identifier
        }),
        success: function(a) {
            a && a.id ? ($("#payment_session_id").val(a.id), $("#payment_session_name").val(a.name), requestToken()) : (console.log(a), erroTenteNovamente("N\u00e3o foi poss\u00edvel gerar sess\u00e3o v\u00e1lida. Tente novamente. (ERRSE01)"))
        },
        error: function(a) {
            console.log(a);
            erroTenteNovamente("N\u00e3o foi poss\u00edvel gerar sess\u00e3o v\u00e1lida. Tente novamente. (ERRSE02)")
        },
        complete: function(a) {
            ajaxRequestSession = null
        }
    })
}
var ajaxRequestToken;

function requestToken() {
    var a = $("#payment_session_id").val();
    a ? ajaxRequestToken = $.ajax({
        url: api_payment_url_external + "pub/sessions/" + a + "/tokens?an=li-" + store_identifier,
        headers: {
            "content-type": "application/json",
            accept: "application/json"
        },
        method: "POST",
        dataType: "json",
        data: JSON.stringify(token_data),
        success: function(b) {
            b && b[0].token ? (requestFingerPrint(b[0].paymentSystemName), $("#payment_token").val(b[0].token), $("#payment_bin").val(b[0].bin), $("#payment_last_digits").val(b[0].lastDigits), $("#payment_system_id").val(b[0].paymentSystem),
                $("#payment_system_name").val(b[0].paymentSystemName), mustHaveFingerPrint && !$("#payment_fingerprint").val() ? (console.log("Falha ao gerar FingerPrint"), erroTenteNovamente("N\u00e3o foi poss\u00edvel validar o cart\u00e3o digitado.<br />Tente novamente ou utilize outro cart\u00e3o. (ERRFP01)")) : $("#formularioCheckout").submit()) : (console.log(b), erroTenteNovamente("N\u00e3o foi poss\u00edvel validar o cart\u00e3o digitado.<br />Tente novamente ou utilize outro cart\u00e3o. (ERRFP02)"))
        },
        error: function(b) {
            console.log(b);
            erroTenteNovamente("N\u00e3o foi poss\u00edvel validar o cart\u00e3o digitado.<br />Tente novamente ou utilize outro cart\u00e3o. (ERRFP03)")
        },
        complete: function(b) {
            ajaxRequestToken = null
        }
    }) : (console.log("Session inexistente"), erroTenteNovamente("N\u00e3o foi poss\u00edvel validar o cart\u00e3o digitado.<br />Tente novamente ou utilize outro cart\u00e3o. (ERRFP04)"))
}
var mustHaveFingerPrint = !1;

function requestFingerPrint(a) {
    var b = $.grep(payment_system_card, function(c, e) {
        return c.name == a
    });
    b && b.length && ("pagseguro" === b[0].code || "pagsegurov2" === b[0].code ? (mustHaveFingerPrint = !0, pagseguro_iniciado && "undefined" !== typeof PagSeguroDirectPayment ? (b = "pagsegurov2" === b[0].code ? "ps-" + PagSeguroDirectPayment.getSenderHash() : PagSeguroDirectPayment.getSenderHash(), $("#payment_fingerprint").val(b)) : iniciarPagseguroTransparente()) : "mercadopagov1" === b[0].code ? (mustHaveFingerPrint = !0, mercadopago_iniciado &&
        "undefined" !== typeof getPixels ? ($("#deviceId").val() || getPixels(), $("#payment_fingerprint").val($("#deviceId").val())) : iniciarMercadoPagoTransparente()) : "getnet" === b[0].code && (mustHaveFingerPrint = !0, iniciarGetnet()))
}

function requestFingerPrintBoleto() {
    mustHaveFingerPrint = !0;
    if (pagseguro_iniciado && "undefined" !== typeof PagSeguroDirectPayment) {
        var a = "ps-" + PagSeguroDirectPayment.getSenderHash();
        $("#payment_fingerprint").val(a);
        $("#payment_fingerprint").val() ? $("#formularioCheckout").submit() : (console.log("Falha ao gerar FingerPrint"), erroTenteNovamente())
    } else console.log("Falha ao gerar FingerPrint"), erroTenteNovamente(), iniciarPagseguroTransparente()
}

function exibirParcelas(a) {
    var b = $(a);
    this._renderizaOption = function(c) {
        var e = c.value,
            g = c.interestRate;
        c = c.quantity;
        var h = e.toFixed(2);
        e = (c * e).toFixed(2);
        return ['<option data-juros="{}" '.replace("{}", g), 'data-valor-parcela="{}" '.replace("{}", h), 'data-valor-total="{}" '.replace("{}", e), 'value="{}">'.replace("{}", c), "{}x de R$ {}".replace("{}", c).replace("{}", h.replace(".", ",").replace(/\d(?=(\d{3})+,)/g, "$&.")), g ? "" : " sem juros", "</option>"].join("")
    };
    this.preencheParcelas = function(c) {
        var e = [];
        if (c &&
            c.length) {
            e.push('<option value="">Escolha...</option>');
            for (var g = 0; g < c.length; g++) e.push(this._renderizaOption(c[g]))
        } else e.push('<option value="">Nenhum parcelamento disponivel</option>');
        b.html(e.join(""))
    }
}

function selecionarBandeiraCartao(a) {
    if (a) $("#pagamentoCartao #radio-cartao").val(a.id), $("#pagamentoCartao #radio-cartao").data("nome-gateway", a.name);
    else if (resetBandeiraSelecionada(), !$("#escolha-cartao #bandeiras-manual").is(":visible") || !$("#escolha-cartao #bandeiras-manual .bandeiras-pagamento li.active").length) {
        $("#escolha-cartao #cartao_cartao_parcelas").html('<option value="">Selecione uma bandeira</option>');
        if (pagali_iniciado) $("#escolha-cartao #bandeiras-manual .bandeiras-pagamento li").removeClass("hide");
        else
            for (i = 0; i < payment_system_card.length; i++) a = payment_system_card[i], a.name && $('#escolha-cartao #bandeiras-manual .bandeiras-pagamento li[data-name="' + a.name + '"]').removeClass("hide");
        $("#escolha-cartao #bandeiras-manual").stop().slideDown()
    }
    calcularTotal()
}
var bandeiraSelecionadaManualmente = !1;

function identificarBandeiraCartao(a) {
    if (payment_system_card) {
        if (pagali_iniciado)
            for (i = 0; i < payment_system_card.length; i++) {
                var b = payment_system_card[i];
                if ("pagali-cartao" === b.code) {
                    pagaliSetCardBrand(a);
                    var c = b
                }
            } else
                for (i = 0; i < payment_system_card.length; i++)
                    if (b = payment_system_card[i], b.validator && b.validator.regex) try {
                        (new RegExp(b.validator.regex)).test(a) && (c = b)
                    } catch (e) {
                        console.log(e)
                    }
        c && ($("#escolha-cartao #bandeiras-manual").stop().slideUp(), pagali_iniciado || (bandeiraSelecionadaManualmente = !1));
        selecionarBandeiraCartao(c)
    }
}

function exibirPlaceholderCartao(a) {
    $(".cartao-placeholder-card").find(".jp-card").removeClass(function(b, c) {
        return (c.match(/(^|\s)jp-card-\S+/g) || []).join(" ")
    });
    a && $(".cartao-placeholder-card").find(".jp-card").addClass("jp-card-identified").addClass(a)
}

function resetBandeiraSelecionada() {
    $("#pagamentoCartao #radio-cartao").val("");
    $("#pagamentoCartao #radio-cartao").data("nome-gateway", null);
    $("#escolha-cartao #cartao_cartao_parcelas").html('<option value="">Digite o n\u00famero do cart\u00e3o</option>');
    $("#escolha-cartao #bandeiras-manual").stop().slideUp();
    $("#escolha-cartao #bandeiras-manual .bandeiras-pagamento li.active").removeClass("active");
    setTimeout(function() {
        exibirPlaceholderCartao();
        $("#formularioCheckout #escolha-cartao .cartao_dados_numero").removeClass("identified");
        $("#formularioCheckout #escolha-cartao .cartao_dados_numero").removeClass(Payment.getAllCardTypes().join(" "))
    }, 1)
}

function validateCPF(a) {
    if (11 !== a.length || !Array.from(a).filter(function(c) {
            return c !== a[0]
        }).length) return !1;
    var b = 0;
    for (i = 1; 9 >= i; i++) b += parseInt(a.substring(i - 1, i)) * (11 - i);
    b = 10 * b % 11;
    if (10 == b || 11 == b) b = 0;
    if (b != parseInt(a.substring(9, 10))) return !1;
    b = 0;
    for (i = 1; 10 >= i; i++) b += parseInt(a.substring(i - 1, i)) * (12 - i);
    b = 10 * b % 11;
    if (10 == b || 11 == b) b = 0;
    return b != parseInt(a.substring(10, 11)) ? !1 : !0
}
var currentCardValueUsed = null;
$(function() {
    function a(f) {
        var k = !1;
        c && (c.abort(), c = null);
        c = $.ajax({
            url: "/conta/verificar_cpf",
            dataType: "json",
            data: {
                cpf: f
            },
            success: function(d) {
                "ERRO" == d.situacao && ($("#id_cpf").parents(".control-group").addClass("error"), $("#id_cpf").next(".help-block").html('CPF j\u00e1 cadastrado.<br /><a href="javascript:exibirLogin();"><strong>Efetuar login</strong></a>').slideDown(), k = !0)
            },
            complete: function(d) {
                c = null
            }
        });
        return k
    }
    alertToModal();
    $("#linhaScroll").length && $("html, body").animate({
            scrollTop: $("#linhaScroll").offset().top - 15
        },
        1500);
    aplicarCupom();
    cardPlaceholder();
    payment_system_card && payment_system_card.length && iniciarTransparente();
    payment_system_bank && payment_system_bank.length && (pagseguro_iniciado || iniciarPagseguroTransparente());
    $("#id_cep, .input-cep").unbind("keyup");
    $("#id_cep, .input-cep").keyup(getCep);
    CONTRATO_INTERNACIONAL && $("#id_cep, .input-cep").blur(getCepBlur);
    if ($.cookie("cep") && $("#id_cep").val() && $("#id_cep").val().replace("-", "") != $.cookie("cep").replace("-", "")) {
        var b = $.cookie("cep");
        $("input[name=endereco_principal][data-cep=" +
            b + "]").length ? $("input[name=endereco_principal][data-cep=" + b + "]").click() : ($("#idEnderecoPrincipal0").click(), 0 > b.indexOf("-") && (b = b.slice(0, 5) + "-" + b.slice(5)), $("#id_cep").val(b).keyup())
    }
    $("input.endereco-principal:checked").length || $("#id_cep, .input-cep").keyup();
    $(".pagamento_selecao_conteiner .cartao_cartao_data_expiracao").keyup(maskExpiryDate);
    $("#id_pais_id").attr("readonly", "readonly");
    $("input.endereco-principal").bind("change", atualizarEndereco);
    $("input.endereco-principal:checked").trigger("change");
    $("input.endereco-principal").each(function() {
        if ($("#id_cep").val() == $(this).data("cep")) return $(this).attr("checked", "checked").trigger("change"), !1
    });
    $("input[name=forma_pagamento]").bind("change", function() {
        calcularTotal();
        if ($(this).attr("data-pagamento-banco-id")) {
            var f = $(this).attr("data-pagamento-banco-id");
            $("[name=pagamento_banco_id]").val(f)
        } else $("[name=pagamento_banco_id]").val("");
        $(".formas.pagamento .accordion-group").not($(this).parent().parent().parent()).slideUp();
        $(".formas.pagamento .accordion-group .mycollapse").not($(this).parent().parent().parent().find(".mycollapse")).removeClass("in");
        $(this).parent().parent().parent().find(".mycollapse").addClass("in");
        $(this).parent().parent().parent().find(".mycollapse").slideDown();
        "cartao" == $(this).data("code") && resize();
        1 < $(".formas.pagamento .accordion-group").length && $("#exibirFormasPagamento").slideDown();
        $(this).attr("data-desconto-aplicar-total") && "False" === $(this).attr("data-desconto-aplicar-total") ? $(".tabela-carrinho .desconto-tr .texto-aplicar-total").slideDown() : $(".tabela-carrinho .desconto-tr .texto-aplicar-total").slideUp()
    });
    $("input.cartao_dados_titular_check").bind("change", function() {
        $(this).is(":checked") ? $(this).parents(".pagamento_selecao_info").find(".cartao_dados_titular").slideDown() : $(this).parents(".pagamento_selecao_info").find(".cartao_dados_titular").slideUp()
    });
    $("input.cartao_dados_titular_check").is(":checked") && $("input.cartao_dados_titular_check").change();
    $("input.cartao_endereco_check").bind("change", function() {
        $(this).is(":checked") ? $(this).parents(".pagamento_selecao_info").find(".cartao_dados_fatura").slideDown() :
            $(this).parents(".pagamento_selecao_info").find(".cartao_dados_fatura").slideUp()
    });
    $(".formas.pagamento .accordion-heading").click(function() {
        $(this).parent().find("input[name=forma_pagamento]").prop("checked", !0);
        $(this).parent().find("input[name=forma_pagamento]").change()
    });
    $("#exibirFormasPagamento a").click(function() {
        $(".formas.pagamento input:checked").prop("checked", !1);
        $(".formas.pagamento .accordion-group").slideDown();
        $("#exibirFormasPagamento").slideUp();
        $(".formas.pagamento .accordion-heading + div.in").slideUp();
        calcularTotal()
    });
    $("#exibirFormasEnvio a").click(function() {
        $(".formas.envio .accordion-group:not(.indisponivel)").slideDown();
        $(".formas.envio .accordion-group.forma-envio-ativo").removeClass("forma-envio-ativo");
        $("#exibirFormasEnvio").slideUp();
        $(".formas.envio input:checked").prop("checked", !1);
        $(".resumo-compra .tabela-carrinho .frete-preco .titulo").length && ($(".resumo-compra .tabela-carrinho .frete-preco small").show(), $(".resumo-compra .tabela-carrinho .frete-preco .titulo").hide());
        calcularTotal()
    });
    $(document).on("change", "input[name=forma_envio]", function() {
        var f = $(this).val(),
            k = $("#formas-envio-wrapper").data("forma-envio");
        f != k && $("#formas-envio-wrapper").data("forma-envio", f);
        $("#forma_envio_code").val($(this).data("codigo"));
        calcularTotal();
        $(".resumo-compra .tabela-carrinho .frete-preco .titulo").length && ($(".resumo-compra .tabela-carrinho .frete-preco .titulo").text($(this).parents(".forma-envio").find(".envio-preco").text()), $(".resumo-compra .tabela-carrinho .frete-preco small").hide(),
            $(".resumo-compra .tabela-carrinho .frete-preco .titulo").show());
        $(".formas.envio .accordion-group").not($(this).parent().parent().parent()).slideUp();
        1 < $(".formas.envio .accordion-group:not(.indisponivel)").length && $("#exibirFormasEnvio").slideDown();
        $(".formas.envio .accordion-group.forma-envio-ativo").removeClass("forma-envio-ativo");
        $(this).parents(".accordion-group").addClass("forma-envio-ativo");
        "mercadoenvios_expresso" === $(this).data("codigo") || "mercadoenvios_normal" === $(this).data("codigo") ?
            ($(".formas.pagamento .accordion-group:not(.mercadopago, .disabled)").addClass("disabled disabled_mercadoenvios"), $("#exibirFormasPagamento a").click()) : $(".formas.pagamento .accordion-group.disabled_mercadoenvios").removeClass("disabled disabled_mercadoenvios");
        "motoboy" === $(this).data("codigo") || "retirar_pessoalmente" === $(this).data("codigo") ? $(".formas.pagamento .accordion-group.entrega.disabled").removeClass("disabled") : $(".formas.pagamento .accordion-group.entrega:not(.disabled)").addClass("disabled");
        $(".formas.pagamento .accordion-group.entrega .accordion-heading .forma-conteiner img").length && ("retirar_pessoalmente" === $(this).data("codigo") && $(".formas .accordion-group.entrega .accordion-heading .forma-conteiner img").attr("src").length ? ($(".formas.pagamento .accordion-group.entrega .accordion-heading .forma-conteiner img").attr("src", $(".formas.pagamento .accordion-group.entrega .accordion-heading .forma-conteiner img").attr("src").replace("entrega.png", "entrega-retirada.png")), $('.formas.pagamento .accordion-group.entrega .entrega-form-group label[for="id_escolher_tipo_pagamento"]').text($('.formas.pagamento .accordion-group.entrega .entrega-form-group label[for="id_escolher_tipo_pagamento"]').text().replace("entrega",
            "retirada"))) : ($(".formas.pagamento .accordion-group.entrega .accordion-heading .forma-conteiner img").attr("src", $(".formas .accordion-group.entrega .accordion-heading .forma-conteiner img").attr("src").replace("entrega-retirada.png", "entrega.png")), $('.formas.pagamento .accordion-group.entrega .entrega-form-group label[for="id_escolher_tipo_pagamento"]').text($('.formas .accordion-group.entrega .entrega-form-group label[for="id_escolher_tipo_pagamento"]').text().replace("retirada", "entrega"))));
        showEndereco();
        "" !== $("#id_endereco").val() ? $("#id_numero").focus() : $("#id_endereco").focus()
    });
    $("#escolha-cartao #bandeiras-manual .bandeiras-pagamento li").click(function() {
        $("#escolha-cartao #bandeiras-manual .bandeiras-pagamento li").removeClass("active");
        $bandeiraSelecionada = $(this);
        var f = $.grep(payment_system_card, function(k, d) {
            return pagali_iniciado ? "pagali-cartao" === k.code : k.name == $bandeiraSelecionada.data("name")
        });
        f && f.length ? ($bandeiraSelecionada.addClass("active"), bandeiraSelecionadaManualmente = !0, selecionarBandeiraCartao(f[0]), exibirPlaceholderCartao($bandeiraSelecionada.data("class"))) : $.fancybox({
            type: "inline",
            content: '<h5 style="line-height: 70px; white-space: nowrap;">Bandeira n\u00e3o dispon\u00edvel</h5>'
        })
    });
    $("#tipoCadastro li a").click(function() {
        var f = $(this).attr("data-value");
        $("#id_tipo").val(f);
        $("#id_tipo_usuario").val(f);
        "PF" === f ? ($("#id_nome").parent().parent().prependTo($(".campos-top")), $("input.cartao_dados_titular_check").length && $("input.cartao_dados_titular_check").attr("readonly") &&
            $("input.cartao_dados_titular_check").attr("readonly", !1).attr("onclick", "")) : ($("#id_nome").parent().parent().prependTo($(".campos-bot")), $("input.cartao_dados_titular_check").length && $("input.cartao_dados_titular_check").attr("checked", !0).attr("readonly", !0).attr("onclick", "return false").change());
        $("#id_tipo").trigger("tipo_cadastro", f)
    });
    $("#tipoCadastro a:first").tab("show");
    $("#formularioCheckout").unbind();
    var c, e = function() {
            var f = $(".email-verificacao").parents().filter(".control-group"),
                k = $("#id_email").val();
            if (!validateEmail(k)) return $("#id_email").html("Email inv\u00e1lido."), !1;
            $.getJSON("/conta/verificar_email", {
                email: k
            }, function(d) {
                "SUCESSO" == d.situacao ? f.removeClass("error") : (f.addClass("error"), $(".email_verificacao").html(d.mensagem))
            })
        },
        g;
    $("#id_email").keyup(function() {
        clearTimeout(g);
        g = setTimeout(e, 1001)
    });
    $("#formularioCheckout .control-group.required .controls input").focusout(function() {
        if ("id_senha" === $(this).attr("id")) {
            if (5 > $(this).val().length) return $(this).parents(".required").addClass("erro error"),
                $(this).next(".help-block").text("M\u00ednimo 5 caracteres").slideDown(), !1;
            var f = $("#id_confirmacao_senha");
            f.val() && f.val() !== $(this).val() && (f.parents(".required").addClass("erro error"), f.next(".help-block").text("As senhas digitadas n\u00e3o coincidem").slideDown())
        } else if ("id_confirmacao_senha" === $(this).attr("id")) {
            if ($(this).val() !== $("#id_senha").val()) return $(this).parents(".required").addClass("erro error"), $(this).next(".help-block").text("As senhas digitadas n\u00e3o coincidem").slideDown(),
                !1
        } else if ("id_email" === $(this).attr("id")) {
            if (!validateEmail(this.value)) return $(this).parents(".required").addClass("erro error"), $(this).next(".help-block").text("Email inv\u00e1lido").slideDown(), !1
        } else if ("id_nome" === $(this).attr("id")) {
            if (0 > this.value.trim().indexOf(" ")) return $(this).parents(".required").addClass("erro error"), $(this).next(".help-block").text("Digite seu nome completo").slideDown(), !1
        } else if ("id_cpf" === $(this).attr("id")) {
            f = this.value.replace(/\.|-/gi, "");
            if (!validateCPF(f)) return $(this).parents(".required").addClass("erro error"),
                $(this).next(".help-block").text("CPF inv\u00e1lido").slideDown(), !1;
            if (a(f)) return $(this).parents(".required").addClass("error"), $(this).next(".help-block").text("CPF j\u00e1 cadastrado").slideDown(), !1
        } else if ("id_numero" === $(this).attr("id") && "20" === $(this).attr("maxlength") && 6 < $(this).val().length) return $(this).parents(".required").addClass("erro error"), $(this).next(".help-block").text("M\u00e1ximo 6 caracteres").slideDown(), !1;
        "" === this.value || 0 <= this.value.indexOf("__") ? ($(this).parents(".required").addClass("erro error"),
            $(this).next(".help-block").text("Este campo \u00e9 obrigat\u00f3rio").slideDown()) : ($(this).parents(".required").removeClass("erro error"), $(this).next(".help-block").slideUp())
    });
    $("#formularioCheckout #escolha-cartao .cartao_dados_numero").focusout(function() {
        var f = $(this).val().replace(/\D/g, "");
        currentCardValueUsed !== f && ("object" === typeof requestValorDataOld && null !== requestValorDataOld && requestValorDataOld.forma_pagamento_id && (requestValorDataOld.forma_pagamento_id = null), (currentCardValueUsed =
            f) && 13 <= f.length ? identificarBandeiraCartao(f) : resetBandeiraSelecionada())
    });
    $("#escolha-cartao #cartao_cartao_parcelas").change(function() {
        var f = $(this);
        (f = f.find("option[value='" + f.val() + "']").data("valor-total")) && alteraValorTotal(f, !0)
    });
    $("#formularioCheckout #id_politica_privacidade").change(function() {
        $parent = $(this).parents(".required");
        $helpBlock = $parent.find(".help-block");
        $parent.toggleClass("erro error", !this.checked);
        this.checked ? $helpBlock.slideUp() : $helpBlock.slideDown()
    });
    $('[data-toggle="tooltip"]').tooltip();
    $("#finalizarCompra").click(function(f) {
        f.preventDefault();
        atualizarDadosCliente();
        validarCheckout(!0) && ($("#finalizarCompra").button("loading"), $("#finalizarCompra").addClass("is_loading"), f = $("#formasPagamento input[name=forma_pagamento]:checked"), "radio-cartao" === f.attr("id") ? pagali_iniciado ? pagaliRequestCardToken() : requestSession() : "radio-pptransparente" === f.attr("id") && "function" === typeof paypalPlusDoCheckout ? paypalPlusDoCheckout() : 201 == f.val() ? validarPagarNaEntrega() : "radio-pagsegurov2-6" ===
            f.attr("id") ? requestFingerPrintBoleto() : $("#formularioCheckout").submit());
        return !1
    });
    var h;
    $("#formularioCheckout").submit(function(f) {
        var k = $(this);
        clearTimeout(h);
        if (validarCheckout(!1) && !0 !== k.data("submitted")) return k.data("submitted", !0), h = setTimeout(function() {
            erroTenteNovamente("Falha ao realizar pedido. Tente novamente. (ERRTM01)");
            k.data("submitted", !1)
        }, 5E5), !0;
        f.preventDefault();
        return !1
    });
    b = window.location.search.replace("?", "");
    if ($("#id_email").val() || 0 <= b.indexOf("email")) 0 <= b.indexOf("email") &&
        $("#id_email").val(decodeURIComponent(b.slice(b.indexOf("email") + 6).split("&")[0])), exibirCadastro();
    $(".identificacao").length || selecionar_pagamento_padrao()
});
$(window).on("resize", function() {
    clearTimeout(a);
    var a = setTimeout(resize, 100)
});

function iniciarPagarNaEntrega() {
    if (entrega_tipos_ativo) {
        try {
            for (var a = JSON.parse(entrega_tipos_ativo), b = 0; b < a.length; ++b) {
                var c = $.grep(pagar_entrega_tipos, function(g, h) {
                    return g.id == a[b]
                });
                if (c) {
                    c = c[0];
                    var e = '<option value="' + c.id + '" data-label="' + c.label + '">' + c.label + "</option>";
                    $("#escolha-entrega-201 #id_escolher_tipo_pagamento").append(e)
                }
            }
        } catch (g) {
            console.log(g), $(".accordion-group.entrega").remove()
        }
        $("#escolha-entrega-201 #id_valor_troco").maskMoney({
            thousands: ".",
            decimal: ",",
            prefix: "R$ ",
            allowZero: !0,
            affixesStay: !1
        });
        $("#escolha-entrega-201 #id_escolher_tipo_pagamento").change(function() {
            var g = $("#escolha-entrega-201 #id_valor_troco"),
                h = g.parent(),
                f = $(this).find("option:checked").attr("data-label");
            "Dinheiro" === f ? h.slideDown() : (h.slideUp(), g.val("0,00"));
            $("#escolha-entrega-201 #id_tipo_pagamento").val(f)
        }).change()
    }
}

function validarPagarNaEntrega() {
    valor_troco = $("#escolha-entrega-201 #id_valor_troco").val().replace("R$ ", "").replace(".", "").replace(",", ".");
    valor_troco = parseFloat(valor_troco);
    valor_pagamento = $("#escolha-entrega-201 .pagamento-valor").text().replace("R$ ", "").replace(".", "").replace(",", ".");
    valor_pagamento = parseFloat(valor_pagamento);
    "Dinheiro" == $("#escolha-entrega-201 #id_tipo_pagamento").val() && valor_troco < valor_pagamento && 0 < valor_troco ? (alert("Voc\u00ea precisa informar um valor para troco maior do que o valor da compra."),
        $("#finalizarCompra").button("reset")) : $("#escolha-entrega-201 #id_tipo_pagamento").val() ? $("#formularioCheckout").submit() : (alert("Selecione o tipo de pagamento na entrega"), $("#finalizarCompra").button("reset"))
}

function iniciarTransparente() {
    var a = [];
    for (i = 0; i < payment_system_card.length; i++) a.push(payment_system_card[i].code);
    (a.indexOf("pagseguro") + 1 || a.indexOf("pagsegurov2") + 1) && iniciarPagseguroTransparente();
    a.indexOf("mercadopagov1") + 1 && iniciarMercadoPagoTransparente();
    a.indexOf("pagali-cartao") + 1 && iniciarPagaliTransparente()
}
var pagseguro_iniciado = !1;

function iniciarPagseguroTransparente() {
    setTimeout(function() {
        var a = document.createElement("script"),
            b = document.getElementsByTagName("script")[0];
        a.src = document.location.protocol + "//stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js?" + Math.floor((new Date).getTime() / 36E5);
        a.async = !0;
        a.type = "text/javascript";
        b.parentNode.insertBefore(a, b)
    }, 1);
    pagseguro_iniciado = !0
}
var mercadopago_iniciado = !1;

function iniciarMercadoPagoTransparente() {
    setTimeout(function() {
        $("body").append("<form><input type='hidden' id='deviceId' name='deviceId'></form>");
        var a = document.createElement("script"),
            b = document.getElementsByTagName("script")[0];
        a.src = "https://resources.mlstatic.com/device/meli-metrix.min.js";
        a.async = !0;
        a.type = "text/javascript";
        b.parentNode.insertBefore(a, b);
        setTimeout(function() {
            "undefined" !== typeof getPixels && getPixels()
        }, 5E3)
    }, 1);
    mercadopago_iniciado = !0
}
var getnet_iniciado = !1;

function iniciarGetnet() {
    var a = getSessionGetnet($("#payment_session_id").val());
    setTimeout(function() {
        var b = document.createElement("script"),
            c = document.getElementsByTagName("script")[0];
        b.src = "https://h.online-metrix.net/fp/tags.js?org_id=k8vif92e&session_id=" + a;
        b.async = !0;
        b.type = "text/javascript";
        c.parentNode.insertBefore(b, c)
    }, 1);
    $("#payment_fingerprint").val(a);
    getnet_iniciado = !0
}

function getSessionGetnet(a) {
    a = a.split("").reverse().join("").split("-")[0];
    return client_id + a
}
var pagali_iniciado = !1;

function iniciarPagaliTransparente() {
    pagali_script && setTimeout(function() {
        var a = document.createElement("script"),
            b = document.getElementsByTagName("script")[0];
        a.src = pagali_script;
        a.async = !0;
        a.type = "text/javascript";
        b.parentNode.insertBefore(a, b)
    }, 1)
};