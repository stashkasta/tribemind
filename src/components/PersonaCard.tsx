// Update the avatar section in PersonaCard to use the uploaded avatar:
<div className="flex items-center space-x-4 mb-4">
  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center overflow-hidden">
    {persona.avatar ? (
      <img 
        src={persona.avatar} 
        alt="Avatar" 
        className="w-full h-full object-cover"
      />
    ) : (
      <User className="w-6 h-6 text-white" />
    )}
  </div>
  <div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
      {persona.name}
    </h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {persona.demographics.role} • {persona.demographics.age}
    </p>
  </div>
</div>