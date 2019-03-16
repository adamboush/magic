
# Magic, create your next ASP.NET Core web API in 5 minutes

Magic is a starter kit for your ASP.NET Core web APIs, that brings the ideas of DRY (_"Don't Repeat Yourself"_) to an extreme level.
If you follow a small recipe as you create your controller endpoints, services, view models, and database models, you will literally
start out with 80% of your job done. The project is hence in such a way a template for your own projects, allowing you to _"hit the ground
running"_ as you start out your next project. Magic is best suited for database applications, where you need to wrap your database tables,
and present these to some client, using an HTTP REST API. Basically, for all your CRUD needs, all you need to do to create your Magic wrapper,
is to create a service, a contract (service interface), a controller, and declare your models (view model and database model). After
you have correctly declared these types, Magic simply takes care of the rest for you automagically.

video

Out of the box Magic is a simple HTTP REST TODO web api, but this is only there to serve as an example. Remove the existing TODO projects,
and replace them with your own domain types, and you'll hit the ground running. All parts of your application can easily be modified, extended
or changed, by simply overriding that which you need to override. In such a way Magic provides you with a consistent API, allowing you to
extend and modify that which you need to modify, and having the rest done automagically for you through the powers of Magic.

## Features

Magic supports MySQL, MSSQL and SQLIte out of the box, but adding support for your own relational database type, can be done with three lines
of code. This is possible due to the usage of Fluent nHibernate. Magic relies upon the following projects.

* Fluent nHibernate
* Mapster
* Ninject
* Swashbuckle Swagger UI
* log4net

## HOWTO wrap a database table

1. Create your database model class(es) in the _"model"_ folder. See `magic.model.todo` for an example.
2. Make sure you create a `ClassMap` for your model, mapping your type to your database.
3. Create your contract (service interface) in the _"contracts"_ folder. Make sure it inherits from `ICrudService`. See the `magic.contracts.todo` for an example.
4. Create your service implementation in the _"services"_ folder, and inherit your service from `CrudService`. See `magic.services.todo` for an example.
5. Create your view model in the _"web/model"_ folder. See the `magic.web.model.todo` project for an example.
6. Create your controller in the _"web/controller"_ folder, and inherit it from the `CrudController` class. See the `magic.web.controller.todo` project for an example.
7. Add a reference to your controller into the `magic.backend` project and add the name of your assembly into the `plugins` section of the _"appsettings.json"_ file.

## Overriding Magic with your own custom functionality

If you want to modify some service, you can easily override whatever method you want to override in your service implementation.
You can also add new service methods, by adding a method to your service interface. In addition, you can also override your web controller methods,
and for instance add the `[Authorize]` attribute, or change other parts of its behavior somehow. In general, all parts of Magic are overridable, while still
providing _"sane defaults"_ for you out of the box.

## License, buy me a bottle of Champagne

Magic is licensed as Affero GPL, which implies that you can only use it to create Open Source software - However, a proprietary
enabling license can be obtained for $50 by following [this PayPal link](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=W5AG4JZE2TL98) and
pay me $50 dollars - At which point you are free to create _one_ closed source web app. If you want to create multiple closed source web APIs using Magic, you'll
have to purchase one license for each web API project you want to create.

* [Purchase closed source license for $50](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=W5AG4JZE2TL98)

Notice, without a closed source license, your code automatically becomes Open Source, and you'll have to provide a link to your own source code from any website(s),
and/or application(s) that are consuming your Magic web API. With a closed source license, you can create closed source code, and you don't have to provide a link
to neither me, nor your own source code.
