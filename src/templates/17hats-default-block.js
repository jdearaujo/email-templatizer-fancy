(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['17hats-default-block'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout:fixed;\" class=\"min-width\"><tbody>\n  <tr>\n    <td bgcolor=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.style : depth0)) != null ? stack1.background : stack1), depth0))
    + "\" align=\"center\" style=\"padding: 70px 15px 70px 15px;\" class=\"section-padding\">\n      <!--[if gte mso 9]><table id=\"outlookholder\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tr><td><![endif]-->\n      <!--[if (IE)]><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"500\" align=\"center\"><tr><td><![endif]-->\n      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"500\" class=\"responsive-table\"><tbody>\n        <tr>\n          <td>\n            <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody>\n              <tr>\n                <td>\n                  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody>\n                    <tr>\n                      <td class=\"padding2\">\n                        <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody>\n                          <tr>\n                            <td align=\"center\">\n                              <a href=\""
    + escapeExpression(((helper = (helper = helpers.image_link || (depth0 != null ? depth0.image_link : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image_link","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"><img alt=\""
    + escapeExpression(((helper = (helper = helpers.image_alt || (depth0 != null ? depth0.image_alt : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image_alt","hash":{},"data":data}) : helper)))
    + "\" src=\"https://s3.amazonaws.com/17hats-website/"
    + escapeExpression(((helper = (helper = helpers.image_name || (depth0 != null ? depth0.image_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image_name","hash":{},"data":data}) : helper)))
    + "\" width=\""
    + escapeExpression(((helper = (helper = helpers.image_width || (depth0 != null ? depth0.image_width : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image_width","hash":{},"data":data}) : helper)))
    + "\" height=\""
    + escapeExpression(((helper = (helper = helpers.image_height || (depth0 != null ? depth0.image_height : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image_height","hash":{},"data":data}) : helper)))
    + "\" border=\"0\" style=\"display:block; padding:0; color:"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.style : depth0)) != null ? stack1.hcolor : stack1), depth0))
    + "; text-decoration:none; font-family:'Open Sans','Helvetica Neue',Arial,sans-serif; font-size:20px;\"></a>\n                            </td>\n                          </tr>\n                        </tbody></table>\n                      </td>\n                    </tr>\n                  </tbody></table>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody>\n                    <tr>\n                      <td align=\"center\" style=\"font-size:24px; font-weight:600; font-family:'Open Sans','Helvetica Neue',Arial,sans-serif; color:"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.style : depth0)) != null ? stack1.hcolor : stack1), depth0))
    + "; padding-top:30px; letter-spacing:-0.05em;\" class=\"padding2\">\n                        "
    + escapeExpression(((helper = (helper = helpers.headline || (depth0 != null ? depth0.headline : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"headline","hash":{},"data":data}) : helper)))
    + "\n                      </td>\n                    </tr>\n                    <tr>\n                      <td align=\"center\" style=\"padding:20px 0 0 0; font-size:16px; line-height:24px; font-family:'Open Sans','Helvetica Neue',Arial,sans-serif; color:"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.style : depth0)) != null ? stack1.pcolor : stack1), depth0))
    + ";\" class=\"padding2\">\n                        "
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "\n                      </td>\n                    </tr>\n                  </tbody></table>\n                </td>\n              </tr>\n              <tr>\n                <td align=\"center\">\n                  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody>\n                    <tr>\n                      <td align=\"center\" style=\"padding: 25px 0 0 0;\" class=\"padding2\">\n                        <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"responsive-button\"><tbody>\n                          <tr>\n                            <td align=\"center\" style=\"padding: 0;\">\n                              <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"responsive-button\"><tbody>\n                                <tr>\n                                  <td align=\"center\" style=\"-webkit-border-radius:8px; -moz-border-radius:8px; border-radius:8px;\" bgcolor=\"#72B624\">\n                                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.button_href || (depth0 != null ? depth0.button_href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"button_href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" style=\"font-size:18px; font-weight:bold; font-family:'Open Sans','Helvetica Neue',Arial,sans-serif; color:#ffffff; text-decoration:none; -webkit-border-radius:8px; -moz-border-radius:8px; border-radius:8px; padding:12px 18px; display:block; text-shadow:-1px -1px 0px rgba(0,0,0,0.25);\">\n                                    <!--[if gte mso 9]>&nbsp; <![endif]-->\n                                      "
    + escapeExpression(((helper = (helper = helpers.button_text || (depth0 != null ? depth0.button_text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"button_text","hash":{},"data":data}) : helper)))
    + "\n                                    <!--[if gte mso 9]>&nbsp; <![endif]-->\n                                    </a>\n                                  </td>\n                                </tr>\n                              </tbody></table>\n                            </td>\n                          </tr>\n                        </tbody></table>\n                      </td>\n                    </tr>\n                  </tbody></table>\n                </td>\n              </tr>\n            </tbody></table>\n          </td>\n        </tr>\n      </tbody></table>\n      <!--[if mso]></td></tr></table><![endif]-->\n      <!--[if (IE)]></td></tr></table><![endif]-->\n    </td>\n  </tr>\n</tbody></table>";
},"useData":true});
})();