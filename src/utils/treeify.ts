type Configure = {
  id: string;
  parentId: string;
};

type Tree<T> = T & {
  children?: Tree<T>[];
};

export function treeify<T>(data: T[], configure: Partial<Configure>): Tree<T>[] {
  const config: Configure = Object.assign(
    {
      id: 'id',
      parentId: 'parentId',
    },
    configure,
  );

  const disposable: any = {};

  const roots: Tree<T>[] = [];

  const setRoots = (el: Tree<T>) => {
    roots.push(el);
  };

  for (let i = 0; i < data.length; i++) {
    const el: any = data[i];
    const id = el[config.id]; // el['id']
    const parentId = el[config.parentId];
    // disposable {1:[],2[],}  disposable.1 = []
    if (!(id in disposable)) {
      disposable[id] = [];
    }

    // disposable {1:[],3[],-1[]}  disposable.1 = [] disposable.3 = []
    if (!(parentId in disposable)) {
      disposable[parentId] = [];
    }
    //{id:1,parentId:3,name:用户管理,children:[]}
    //{id:2,parentId:3,name:菜单管理,children:[]}
    //{id:3,parentId:-1,name:菜单管理,children:[{id:1,parentId:3,name:用户管理,children:[]},{id:2,parentId:3,name:菜单管理,children:[]}]}
    el.children = disposable[id];
    // disposable.3 = [{id:1,parentId:3,name:用户管理,children:[]},{id:2,parentId:3,name:菜单管理,children:[]}]
    // disposable.-1 = {id:3,parentId:-1,name:菜单管理,children:[{id:1,parentId:3,name:用户管理,children:[]},{id:2,parentId:3,name:菜单管理,children:[]}]}
    disposable[parentId].push(el);
    //roots = [{id:3,parentId:-1,name:菜单管理,children:[{id:1,parentId:3,name:用户管理,children:[]},{id:2,parentId:3,name:菜单管理,children:[]}]}]
    if (parentId === -1) setRoots(el);
  }
  console.log(roots);

  return roots;
}
