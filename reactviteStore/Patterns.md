## performance: PRPL Pattern
- Pushing critical resources efficiently, which minimizes the amount of roundtrips to the server and reducing the loading time.
- Rendering the initial route soon as possible to improve the user experience
- Pre-caching assets in the background for frequently visited routes to minimize the amount of requests to the server and enable a better offline experience
- Lazily loading routes or assets that aren’t requested as frequently


## REACTJS patterns

term: Higher-Order Component (HOC)

1. Component-Based Architecture (Foundation)

2. Hooks Pattern (Modern Core)
Common hooks
Custom Hooks (VERY important pattern) (useEffect in function)

3. Controlled vs Uncontrolled Components (controls inside component)

4. Lifting State Up 

5. Context API Pattern (Global State Lite) = useContext(data)

6. State Management Patterns
local state / global state
Redux Pattern

7. Container / Presentational Pattern (component / list)

9. Render Props Pattern (children, render)
render(data), children as a function children(data)
==> parent
 <!-- <MouseTracker
      render={({ x, y }) => (
        <h1>Mouse at: {x}, {y}</h1>
      )}
    /> -->



## Creational patterns

### Abstract Factory
providing an interface for creating families of related objects
Abstract Factory → family of related products created together
Abstract Factory → multiple related products, factory provides entire family

### Factory Method
Factory Method → Factory method must be implemented by subclass
Factory Method → one product type per method, subclass decides
Factory Method → instantiation logic centralized

### Builder
Builder → step-by-step construction of a complex object

### Singleton
classe singleton, client
Singleton → only one instance
- Database connection pool manager
- Cache manager
- Event bus / global mediator
- Thread pool / task scheduler

### Prototype
Créer un nouvel object à partir d'un objet existant
Prototype → clone objects
===> Configuration / Logger / Global Resource Manager


## Behavioral patterns

### Chain of responsability
Faire circuler des demandes dans une chaine de handlers next() (middlewares) vers le system de Commandes
===> http request middleware process

### Command 
action ==> (transformation) création d'un object avec des instructions et des arguments. 
- paramétrage de méthodes
- plannig d'exécution
- gérer une file d'attente
- annulation éventuelle
===> do/undo command with history tracking

### Iterator
Parcourir les éléments d'une collection sans révéler sa représentation interne (item.next())
===> iterator.hasNext() iterator.next() traversing collection

### Mediator (MVC)
Restreint la communication entre les objects via un médiateur
(Front - Formulaires sont gérés grace à une classe unique si possible)
le Médiateur notifie (classes / méthodes)
Mediator → manages communication between objects
===> GUI Component Interaction 

### Memento 
Rétablir l'état d'un object (historique de l'état)
===> Save/Restore (Undo Snapshots in Editors & Games)

### Observer
Mécanisme de souscription. Permet à plusieurs objects de souscrire
à un cannal qui écoute et transmet l'état des objects (sujet) qu'ils observent. (publisher / subscriber) 
===> DOM Events (Event Listeners)

### State / automates
Un programme possède un nombre fini d'états. il en de même pour les
transitions. hors il se peut que certains états ne sont plus accessibles
- extraction du comportement lié aux états dans ces classes.
- une classe possède des méthodes qui sont exécutées.
- L'Etat se propose de créer un contexte et de stocker les références
puis de les transmettres. (Contexte - Etat - Etat concrets)
===> Finite State Machines (e.g., UI / Media Player / TCP States) 

### Strategie
Un context commun d'exécution. (strategy, setStrategy, executeStrategy).
chaques instances sont déclarées dans un certain contexte
Strategy → object chooses among interchangeable algorithms
===> Payment Methods (Strategy Selection at Runtime)


### Template method (parent / enfants)
Une structure initiale. Des sous-classes et de nouvelles méthodes.
classes (abstraites, templateMethods, ClassesContretes qui étendent Abstraite - un client qui utilise la class abstraite)
===> Data Processing Pipelines (e.g., parsing files) classe commune DataProcessor et SubClasses pour les spécificités

### Visitor
crér une classes capable d'accepter ue série de composents utilisable par un client. système de paramètrage.
===> Abstract Syntax Tree (AST) Processing (Compilers / Interpreters)
- File system operations (size, search, permissions)
- UI trees (rendering, layout, accessibility checks)
- Document processing (HTML/XML transformations)


## Structural patterns

### Adapter
cyble, origine, adapter
Adapter → retrofits an existing interface to match another
Adapter → converts interface for one client
Adapter → changes interface
Adapter → converts one interface to another
===> Integrating Third-Party Libraries / APIs

### Bridge
Séparation de l'abstraction et de l'implementation
abstraction, abstraction affinée, implementateur, implémentateur concret qui étendent l'implémentateur
Bridge → designed from the start to separate abstraction & implementation
Bridge → abstraction delegates to implementation for flexibility
===> UI Toolkit with Multiple Platformss

### Composite
Composite → represents whole-part hierarchies
===> File System Hierarchy (Folders & Files)

### Decorator
===> Enhancing UI Components / Streams
Decorator → adds behavior
Decorator → adds behavior dynamically
Decorator → adds behavior to a single object dynamically
Decorator → adds features

### Facade
Ajouter une interface simplifiée et unifiée à un système complexe
Facade → simplifies access for many clients
Facade → simplifies existing system for convenience
===> Complex Subsystems (e.g., Multimedia Libraries, APIs)

### Flyweight
classe, factory
stocker et partager la mémoire intrinsec  
Flyweight → shares state for memory efficiency
Flyweight → many shared objects for efficiency
Flyweight → reuse existing shared objects
===> Text Rendering / Character Objects in a Document Editor

### Proxy
Real subject, proxy, 
Proxy → same interface, controls access or adds behavior
===> Virtual Proxy for Expensive Resources (Lazy Loading / Access Control)












