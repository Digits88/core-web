import {describe,
  beforeEach,
  it,
  expect,
  ddescribe,
  iit,
  SpyObject,
  el,
  proxy} from 'angular2/test_lib';
import {IMPLEMENTS,
  isBlank,
  isPresent} from 'angular2/src/facade/lang';
import {ListWrapper,
  MapWrapper} from 'angular2/src/facade/collection';
import {DOM} from 'angular2/src/dom/dom_adapter';
import {Content} from 'angular2/src/render/dom/shadow_dom/content_tag';
import {LightDom} from 'angular2/src/render/dom/shadow_dom/light_dom';
import {RenderView} from 'angular2/src/render/dom/view/view';
import {ViewContainer} from 'angular2/src/render/dom/view/view_container';
class FakeView {
  constructor(containers = null) {
    this.boundElements = [];
    this.contentTags = [];
    this.viewContainers = [];
    if (isPresent(containers)) {
      ListWrapper.forEach(containers, (c) => {
        var boundElement = null;
        var contentTag = null;
        var vc = null;
        if (c instanceof FakeContentTag) {
          contentTag = c;
          boundElement = c.contentStartElement;
        }
        if (c instanceof FakeViewContainer) {
          vc = c;
          boundElement = c.templateElement;
        }
        ListWrapper.push(this.contentTags, contentTag);
        ListWrapper.push(this.viewContainers, vc);
        ListWrapper.push(this.boundElements, boundElement);
      });
    }
  }
  noSuchMethod(i) {
    super.noSuchMethod(i);
  }
}
Object.defineProperty(FakeView, "annotations", {get: function() {
    return [new proxy, new IMPLEMENTS(RenderView)];
  }});
class FakeViewContainer {
  constructor(templateEl, nodes = null, views = null) {
    this.templateElement = templateEl;
    this._nodes = nodes;
    this._contentTagContainers = views;
  }
  nodes() {
    return this._nodes;
  }
  contentTagContainers() {
    return this._contentTagContainers;
  }
  noSuchMethod(i) {
    super.noSuchMethod(i);
  }
}
Object.defineProperty(FakeViewContainer, "annotations", {get: function() {
    return [new proxy, new IMPLEMENTS(ViewContainer)];
  }});
class FakeContentTag {
  constructor(contentEl, select = '', nodes = null) {
    this.contentStartElement = contentEl;
    this.select = select;
    this._nodes = nodes;
  }
  insert(nodes) {
    this._nodes = nodes;
  }
  nodes() {
    return this._nodes;
  }
  noSuchMethod(i) {
    super.noSuchMethod(i);
  }
}
Object.defineProperty(FakeContentTag, "annotations", {get: function() {
    return [new proxy, new IMPLEMENTS(Content)];
  }});
export function main() {
  describe('LightDom', function() {
    var lightDomView;
    beforeEach(() => {
      lightDomView = new FakeView();
    });
    describe("contentTags", () => {
      it("should collect content tags from element injectors", () => {
        var tag = new FakeContentTag(el('<script></script>'));
        var shadowDomView = new FakeView([tag]);
        var lightDom = new LightDom(lightDomView, shadowDomView, el("<div></div>"));
        expect(lightDom.contentTags()).toEqual([tag]);
      });
      it("should collect content tags from ViewContainers", () => {
        var tag = new FakeContentTag(el('<script></script>'));
        var vc = new FakeViewContainer(null, null, [new FakeView([tag])]);
        var shadowDomView = new FakeView([vc]);
        var lightDom = new LightDom(lightDomView, shadowDomView, el("<div></div>"));
        expect(lightDom.contentTags()).toEqual([tag]);
      });
    });
    describe("expandedDomNodes", () => {
      it("should contain root nodes", () => {
        var lightDomEl = el("<div><a></a></div>");
        var lightDom = new LightDom(lightDomView, new FakeView(), lightDomEl);
        expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
      });
      it("should include view container nodes", () => {
        var lightDomEl = el("<div><template></template></div>");
        var lightDom = new LightDom(new FakeView([new FakeViewContainer(DOM.firstChild(lightDomEl), [el('<a></a>')])]), null, lightDomEl);
        expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
      });
      it("should include content nodes", () => {
        var lightDomEl = el("<div><content></content></div>");
        var lightDom = new LightDom(new FakeView([new FakeContentTag(DOM.firstChild(lightDomEl), '', [el('<a></a>')])]), null, lightDomEl);
        expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
      });
      it("should work when the element injector array contains nulls", () => {
        var lightDomEl = el("<div><a></a></div>");
        var lightDomView = new FakeView();
        var lightDom = new LightDom(lightDomView, new FakeView(), lightDomEl);
        expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
      });
    });
    describe("redistribute", () => {
      it("should redistribute nodes between content tags with select property set", () => {
        var contentA = new FakeContentTag(null, "a");
        var contentB = new FakeContentTag(null, "b");
        var lightDomEl = el("<div><a>1</a><b>2</b><a>3</a></div>");
        var lightDom = new LightDom(lightDomView, new FakeView([contentA, contentB]), lightDomEl);
        lightDom.redistribute();
        expect(toHtml(contentA.nodes())).toEqual(["<a>1</a>", "<a>3</a>"]);
        expect(toHtml(contentB.nodes())).toEqual(["<b>2</b>"]);
      });
      it("should support wildcard content tags", () => {
        var wildcard = new FakeContentTag(null, '');
        var contentB = new FakeContentTag(null, "b");
        var lightDomEl = el("<div><a>1</a><b>2</b><a>3</a></div>");
        var lightDom = new LightDom(lightDomView, new FakeView([wildcard, contentB]), lightDomEl);
        lightDom.redistribute();
        expect(toHtml(wildcard.nodes())).toEqual(["<a>1</a>", "<b>2</b>", "<a>3</a>"]);
        expect(toHtml(contentB.nodes())).toEqual([]);
      });
      it("should remove all nodes if there are no content tags", () => {
        var lightDomEl = el("<div><a>1</a><b>2</b><a>3</a></div>");
        var lightDom = new LightDom(lightDomView, new FakeView([]), lightDomEl);
        lightDom.redistribute();
        expect(DOM.childNodes(lightDomEl).length).toBe(0);
      });
      it("should remove all not projected nodes", () => {
        var lightDomEl = el("<div><a>1</a><b>2</b><a>3</a></div>");
        var bNode = DOM.childNodes(lightDomEl)[1];
        var lightDom = new LightDom(lightDomView, new FakeView([new FakeContentTag(null, "a")]), lightDomEl);
        lightDom.redistribute();
        expect(bNode.parentNode).toBe(null);
      });
    });
  });
}
function toHtml(nodes) {
  if (isBlank(nodes))
    return [];
  return ListWrapper.map(nodes, DOM.getOuterHTML);
}
//# sourceMappingURL=light_dom_spec.js.map

//# sourceMappingURL=./light_dom_spec.map