<?php


namespace App;


use App\Models\File;
use Illuminate\Support\Facades\Storage;

trait FileTrait
{
    private function destroy($id)
    {
        $file = File::findOrFail($id);
        if (Storage::exists($file->link)) {
            try {
                Storage::delete($file->link);
                $file->delete();
                return true;
            } catch (\Exception $e) {}
        }
        return false;
    }
}
