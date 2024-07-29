"use client";
import {
  createComponent,
  createSignal,
  lazy,
  mergeProps,
  render,
  setupStyleSheet
} from "./chunk-EZ3ZPTV7.js";
import {
  onlineManager,
  require_jsx_runtime,
  useQueryClient
} from "./chunk-E7XDJDBK.js";
import {
  require_react
} from "./chunk-2CLD7BNN.js";
import {
  __privateAdd,
  __privateGet,
  __privateSet,
  __toESM
} from "./chunk-WOOG5QLI.js";

// node_modules/@tanstack/react-query-devtools/build/modern/devtools.js
var React = __toESM(require_react(), 1);

// node_modules/@tanstack/query-devtools/build/dev.js
var _client, _onlineManager, _queryFlavor, _version, _isMounted, _styleNonce, _shadowDOMTarget, _buttonPosition, _position, _initialIsOpen, _errorTypes, _Component, _dispose, _a;
var TanstackQueryDevtools = (_a = class {
  constructor(config) {
    __privateAdd(this, _client);
    __privateAdd(this, _onlineManager);
    __privateAdd(this, _queryFlavor);
    __privateAdd(this, _version);
    __privateAdd(this, _isMounted, false);
    __privateAdd(this, _styleNonce);
    __privateAdd(this, _shadowDOMTarget);
    __privateAdd(this, _buttonPosition);
    __privateAdd(this, _position);
    __privateAdd(this, _initialIsOpen);
    __privateAdd(this, _errorTypes);
    __privateAdd(this, _Component);
    __privateAdd(this, _dispose);
    const {
      client,
      queryFlavor,
      version,
      onlineManager: onlineManager2,
      buttonPosition,
      position,
      initialIsOpen,
      errorTypes,
      styleNonce,
      shadowDOMTarget
    } = config;
    __privateSet(this, _client, createSignal(client));
    __privateSet(this, _queryFlavor, queryFlavor);
    __privateSet(this, _version, version);
    __privateSet(this, _onlineManager, onlineManager2);
    __privateSet(this, _styleNonce, styleNonce);
    __privateSet(this, _shadowDOMTarget, shadowDOMTarget);
    __privateSet(this, _buttonPosition, createSignal(buttonPosition));
    __privateSet(this, _position, createSignal(position));
    __privateSet(this, _initialIsOpen, createSignal(initialIsOpen));
    __privateSet(this, _errorTypes, createSignal(errorTypes));
  }
  setButtonPosition(position) {
    __privateGet(this, _buttonPosition)[1](position);
  }
  setPosition(position) {
    __privateGet(this, _position)[1](position);
  }
  setInitialIsOpen(isOpen) {
    __privateGet(this, _initialIsOpen)[1](isOpen);
  }
  setErrorTypes(errorTypes) {
    __privateGet(this, _errorTypes)[1](errorTypes);
  }
  setClient(client) {
    __privateGet(this, _client)[1](client);
  }
  mount(el) {
    if (__privateGet(this, _isMounted)) {
      throw new Error("Devtools is already mounted");
    }
    const dispose = render(() => {
      const _self$ = this;
      const [btnPosition] = __privateGet(this, _buttonPosition);
      const [pos] = __privateGet(this, _position);
      const [isOpen] = __privateGet(this, _initialIsOpen);
      const [errors] = __privateGet(this, _errorTypes);
      const [queryClient] = __privateGet(this, _client);
      let Devtools;
      if (__privateGet(this, _Component)) {
        Devtools = __privateGet(this, _Component);
      } else {
        Devtools = lazy(() => import("./Q436JGP5-3DGTF2IX.js"));
        __privateSet(this, _Component, Devtools);
      }
      setupStyleSheet(__privateGet(this, _styleNonce), __privateGet(this, _shadowDOMTarget));
      return createComponent(Devtools, mergeProps({
        get queryFlavor() {
          return __privateGet(_self$, _queryFlavor);
        },
        get version() {
          return __privateGet(_self$, _version);
        },
        get onlineManager() {
          return __privateGet(_self$, _onlineManager);
        },
        get shadowDOMTarget() {
          return __privateGet(_self$, _shadowDOMTarget);
        }
      }, {
        get client() {
          return queryClient();
        },
        get buttonPosition() {
          return btnPosition();
        },
        get position() {
          return pos();
        },
        get initialIsOpen() {
          return isOpen();
        },
        get errorTypes() {
          return errors();
        }
      }));
    }, el);
    __privateSet(this, _isMounted, true);
    __privateSet(this, _dispose, dispose);
  }
  unmount() {
    var _a2;
    if (!__privateGet(this, _isMounted)) {
      throw new Error("Devtools is not mounted");
    }
    (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this);
    __privateSet(this, _isMounted, false);
  }
}, _client = new WeakMap(), _onlineManager = new WeakMap(), _queryFlavor = new WeakMap(), _version = new WeakMap(), _isMounted = new WeakMap(), _styleNonce = new WeakMap(), _shadowDOMTarget = new WeakMap(), _buttonPosition = new WeakMap(), _position = new WeakMap(), _initialIsOpen = new WeakMap(), _errorTypes = new WeakMap(), _Component = new WeakMap(), _dispose = new WeakMap(), _a);

// node_modules/@tanstack/react-query-devtools/build/modern/devtools.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function ReactQueryDevtools(props) {
  const queryClient = useQueryClient(props.client);
  const ref = React.useRef(null);
  const {
    buttonPosition,
    position,
    initialIsOpen,
    errorTypes,
    styleNonce,
    shadowDOMTarget
  } = props;
  const [devtools] = React.useState(
    new TanstackQueryDevtools({
      client: queryClient,
      queryFlavor: "React Query",
      version: "5",
      onlineManager,
      buttonPosition,
      position,
      initialIsOpen,
      errorTypes,
      styleNonce,
      shadowDOMTarget
    })
  );
  React.useEffect(() => {
    devtools.setClient(queryClient);
  }, [queryClient, devtools]);
  React.useEffect(() => {
    if (buttonPosition) {
      devtools.setButtonPosition(buttonPosition);
    }
  }, [buttonPosition, devtools]);
  React.useEffect(() => {
    if (position) {
      devtools.setPosition(position);
    }
  }, [position, devtools]);
  React.useEffect(() => {
    devtools.setInitialIsOpen(initialIsOpen || false);
  }, [initialIsOpen, devtools]);
  React.useEffect(() => {
    devtools.setErrorTypes(errorTypes || []);
  }, [errorTypes, devtools]);
  React.useEffect(() => {
    if (ref.current) {
      devtools.mount(ref.current);
    }
    return () => {
      devtools.unmount();
    };
  }, [devtools]);
  return (0, import_jsx_runtime.jsx)("div", { className: "tsqd-parent-container", ref });
}

// node_modules/@tanstack/react-query-devtools/build/modern/index.js
var ReactQueryDevtools2 = false ? function() {
  return null;
} : ReactQueryDevtools;
export {
  ReactQueryDevtools2 as ReactQueryDevtools
};
//# sourceMappingURL=@tanstack_react-query-devtools.js.map
